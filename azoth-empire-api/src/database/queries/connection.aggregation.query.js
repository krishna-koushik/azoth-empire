const { getOffsetFromOpaqueCursor } = require('@lib/utils');

class ConnectionAggregationQuery {
    constructor(args, totalCount) {
        const { first, last, after, before, orderBy } = args;

        this.aggregationQuery = [];
        let $sort = { ['time']: -1 };

        if (orderBy) {
            const { direction, field } = orderBy;
            $sort = { [field]: direction };
        }

        this.aggregationQuery.push({ $sort });

        const afterOffset = getOffsetFromOpaqueCursor(after, 0);
        const beforeOffset = getOffsetFromOpaqueCursor(before, totalCount + 1);

        let skip = Math.max(afterOffset, 0);
        let limit = Math.min(beforeOffset, totalCount + 1) - skip - 1;

        if (typeof first === 'number') {
            limit = Math.min(limit, first);
        }

        if (typeof last === 'number') {
            skip = Math.max(skip, skip + limit - last);
            limit = Math.min(limit, last);
        }

        this.aggregationQuery.push({
            $project: { _id: 1 },
        });
        this.aggregationQuery.push({
            $skip: skip,
        });
        this.aggregationQuery.push({
            $limit: limit,
        });

        this.limit = limit;
        this.skip = skip;
    }
}

module.exports = ConnectionAggregationQuery;
