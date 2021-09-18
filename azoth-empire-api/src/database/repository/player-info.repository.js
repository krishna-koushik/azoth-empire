const { players } = require('../mongodb/mongoose/models');

class PlayerInfoRepository {
    constructor() {}

    async findPlayerByDiscordId(discordId) {
        console.log(`fetching player info for discord id ${discordId}`);
        return await players.findOne({ 'discord.id': `${discordId}` }).exec();
    }

    async findPlayerByPlayerName(playerName) {
        console.log(`fetching player info for playerName ${playerName}`);
        return await players
            .findOne({ name: `${playerName}` })
            .lean()
            .exec();
    }

    async insert(query) {
        const player = new players(query);
        console.info(`starting insert player in mongodb`, { query });
        const response = await player.save();
        console.info('finished inserting documents in mongodb.', {
            response,
        });

        return response.toObject();
    }

    async getById(_id) {
        console.info(`starting finding players in mongodb for id ${_id}`);
        const response = await players.findById(_id).lean().exec();
        console.info(`finished finding players in mongodb for id ${_id}`, {
            response,
        });
        return response;
    }

    async updatePlayerInfo(findQuery, updateData) {
        console.info(`starting to update player in mongodb for findQuery`, {
            findQuery,
            updateData,
        });
        const response = await players.updateOne(findQuery, updateData);
        console.info(`finished updating player in mongodb for findQuery`, {
            response,
        });
        return response;
    }

    async getPlayers(findQuery) {
        console.info(`starting finding players in mongodb`);
        const response = await players.find(findQuery);
        console.info(`finished finding players in mongodb`, {
            response,
        });
        return response;
    }

    async findByAggregation(query) {
        console.info(`starting find players by aggregation query in mongodb`, { query });
        const response = players.aggregate(query.aggregationQuery);
        console.info(`finished finding players by aggregation query in mongodb`, {
            response,
        });

        return response;
    }
}

module.exports = new PlayerInfoRepository();
