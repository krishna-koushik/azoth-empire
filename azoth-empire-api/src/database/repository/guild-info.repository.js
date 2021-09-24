const { guilds } = require('../mongodb/mongoose/models');

class GuildInfoRepository {
  constructor() {}

  async findGuildByGuildName(guildName) {
    console.log(`fetching guild info for guildName ${guildName}`);
    return await guilds
      .findOne({ name: `${guildName}` })
      .lean()
      .exec();
  }

  async insert(query) {
    const guild = new guilds(query);
    console.info(`starting insert guild in mongodb`, { query });
    const response = await guild.save();
    console.info('finished inserting documents in mongodb.', {
      response,
    });

    return response.toObject();
  }

  async getById(_id) {
    console.info(`starting finding guilds in mongodb for id ${_id}`);
    const response = await guilds.findById(_id).lean().exec();
    console.info(`finished finding guilds in mongodb for id ${_id}`, {
      response,
    });
    return response;
  }

  async updateGuildInfo(findQuery, updateData) {
    console.info(`starting to update guild in mongodb for findQuery`, {
      findQuery,
      updateData,
    });
    const response = await guilds.updateOne(findQuery, updateData);
    console.info(`finished updating guild in mongodb for findQuery`, {
      response,
    });
    return response;
  }

  async getGuilds(findQuery) {
    console.info(`starting finding guilds in mongodb`);
    const response = await guilds.find(findQuery);
    console.info(`finished finding guilds in mongodb`, {
      response,
    });
    return response;
  }

  async findByAggregation(query) {
    console.info(`starting find guilds by aggregation query in mongodb`, { query });
    const response = await guilds.aggregate(query.aggregationQuery);
    console.info(`finished finding guilds by aggregation query in mongodb`, {
      response,
    });

    return response;
  }
}

module.exports = new GuildInfoRepository();
