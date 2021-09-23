const { wars } = require('../mongodb/mongoose/models');

class WarInfoRepository {
    constructor() {}

    async insert(query) {
        const war = new wars(query);
        console.info(`starting insert war in mongodb`, { query });
        const response = await war.save();
        console.info('finished inserting documents in mongodb.', {
            response,
        });

        return response.toObject();
    }

    async getById(_id) {
        console.info(`starting finding wars in mongodb for id ${_id}`);
        const response = await wars.findById(_id).lean().exec();
        console.info(`finished finding wars in mongodb for id ${_id}`, {
            response,
        });
        return response;
    }

    async updateWarInfo(findQuery, updateData) {
        console.info(`starting to update war in mongodb for findQuery`, {
            findQuery,
            updateData,
        });
        const response = await wars.updateOne(findQuery, updateData);
        console.info(`finished updating war in mongodb for findQuery`, {
            response,
        });
        return response;
    }

    async getWars(findQuery) {
        console.info(`starting finding wars in mongodb`);
        const response = await wars.find(findQuery);
        console.info(`finished finding wars in mongodb`, {
            response,
        });
        return response;
    }

    async findByAggregation(query) {
        console.info(`starting find wars by aggregation query in mongodb`, { query });
        const response = await wars.aggregate(query.aggregationQuery);
        console.info(`finished finding wars by aggregation query in mongodb`, {
            response,
        });

        return response;
    }
}

module.exports = new WarInfoRepository();
