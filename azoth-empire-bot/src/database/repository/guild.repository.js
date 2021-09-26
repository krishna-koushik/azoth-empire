const { guild } = require('../mongodb/mongoose/models');

class GuildRepository {
    constructor() {}

    async findByFilter(query) {
        console.log(`fetching guild by find query`, { query });
        return await guild.find(query.findQuery).lean().exec();
    }

    async findGuildByName(name) {
        console.log(`fetching guild by name ${name}`);
        return await guild
            .findOne({ name: `${name}` })
            .lean()
            .exec();
    }

    async findGuildByCode(code) {
        console.log(`fetching guild for code ${code}`);
        return await guild
            .findOne({ name: `${code}` })
            .lean()
            .exec();
    }
}

module.exports = new GuildRepository();
