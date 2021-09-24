const WarInfoRepository = require('@database/repository/war-info.repository');
const PlayerInfoRepository = require('@database/repository/player-info.repository');
const ConnectionCountAggregationQuery = require('@database/queries/connection-count.aggregation.query');
const ConnectionAggregationQuery = require('@database/queries/connection.aggregation.query');
const { offsetToCursor } = require('@lib/utils');

class ConnectionHandler {
    constructor(collection) {
        switch (collection) {
            case 'wars':
                this.collection = WarInfoRepository;
                break;
            case 'players':
                this.collection = PlayerInfoRepository;
                break;
        }
    }

    async handle(args) {
        const total = await this.handleTotalCount(args);
        if (total > 0) {
            return await this.handleCollections(args, total);
        }
    }

    async handleTotalCount(args) {
        const query = new ConnectionCountAggregationQuery(args);
        const res = await this.collection.findByAggregation(query);

        const [{ total } = { total: 0 }] = res;
        return total;
    }

    async handleCollections(args, total) {
        let edges = [];
        const { first, last } = args;

        const query = new ConnectionAggregationQuery(args, total);
        const { limit = 0, skip } = query;

        const collections = await this.collection.findByAggregation(query);

        if (limit > 0) {
            edges = collections.map((value, index) => {
                return {
                    cursor: offsetToCursor(skip + index + 1),
                    node: value._id,
                };
            });
        }
        const startEdge = edges[0];
        const endEdge = edges[edges.length - 1];
        return {
            edges,
            pageInfo: {
                startCursor: startEdge ? startEdge.cursor : null,
                endCursor: endEdge ? endEdge.cursor : null,
                hasPreviousPage: last > 0 ? limit > last : skip > 0,
                hasNextPage: skip + limit < total,
                total,
            },
        };
    }
}

module.exports = ConnectionHandler;
