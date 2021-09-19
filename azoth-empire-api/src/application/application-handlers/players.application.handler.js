const PlayerInfoRepository = require('@database/repository/player-info.repository');
const PlayerCountAggregationQuery = require('@database/queries/player-count.aggregation.query');
const PlayersAggregationQuery = require('@database/queries/players.aggregation.query');
const { offsetToCursor } = require('@lib/utils');

class PlayersApplicationHandler {
    async handle(args) {
        const total = await this.handleTotalCount(args);
        if (total > 0) {
            return await this.handlePlayers(args, total);
        }
    }

    async handleTotalCount(args) {
        const query = new PlayerCountAggregationQuery(args);
        const res = await PlayerInfoRepository.findByAggregation(query);

        const [{ total } = { total: 0 }] = res;
        return total;
    }

    async handlePlayers(args, total) {
        let edges = [];
        const { first, last } = args;

        const query = new PlayersAggregationQuery(args, total);
        const { limit = 0, skip } = query;

        const players = await PlayerInfoRepository.findByAggregation(query);

        if (limit > 0) {
            edges = players.map((value, index) => {
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

module.exports = new PlayersApplicationHandler();
