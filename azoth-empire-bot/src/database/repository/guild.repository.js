const { players } = require('../mongodb/mongoose/models');

class GuildRepository {
    constructor() {}

    async findByFilter(query) {
        console.log(`fetching guild by find query`, { query });
        return await players.find(query.findQuery).lean().exec();
    }

    async findGuildByName(name) {
        console.log(`fetching guild by name ${name}`);
        return await players
            .findOne({ name: `${name}` })
            .lean()
            .exec();
    }

    async findGuildByCode(code) {
        console.log(`fetching guild for code ${code}`);
        return await players
            .findOne({ name: `${code}` })
            .lean()
            .exec();
    }
}

module.exports = new GuildRepository();
