class ConnectionCountAggregationQuery {
    constructor(_args) {
        this.aggregationQuery = [
            {
                $group: { _id: null, total: { $sum: 1 } },
            },
            {
                $project: { _id: 0 },
            },
        ];
    }
}

module.exports = ConnectionCountAggregationQuery;
