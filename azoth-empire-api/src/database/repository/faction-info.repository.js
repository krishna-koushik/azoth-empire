const { factions } = require('../mongodb/mongoose/models');

class FactionInfoRepository {
  constructor() {}

  async findFactionByFactionName(factionName) {
    console.log(`fetching faction info for factionName ${factionName}`);
    return await factions
      .findOne({ name: `${factionName}` })
      .lean()
      .exec();
  }

  async insert(query) {
    const faction = new factions(query);
    console.info(`starting insert faction in mongodb`, { query });
    const response = await faction.save();
    console.info('finished inserting documents in mongodb.', {
      response,
    });

    return response.toObject();
  }

  async getById(_id) {
    console.info(`starting finding factions in mongodb for id ${_id}`);
    const response = await factions.findById(_id).lean().exec();
    console.info(`finished finding factions in mongodb for id ${_id}`, {
      response,
    });
    return response;
  }

  async updateFactionInfo(findQuery, updateData) {
    console.info(`starting to update faction in mongodb for findQuery`, {
      findQuery,
      updateData,
    });
    const response = await factions.updateOne(findQuery, updateData);
    console.info(`finished updating faction in mongodb for findQuery`, {
      response,
    });
    return response;
  }

  async getFactions(findQuery) {
    console.info(`starting finding factions in mongodb`);
    const response = await factions.find(findQuery);
    console.info(`finished finding factions in mongodb`, {
      response,
    });
    return response;
  }

  async findByAggregation(query) {
    console.info(`starting find factions by aggregation query in mongodb`, { query });
    const response = await factions.aggregate(query.aggregationQuery);
    console.info(`finished finding factions by aggregation query in mongodb`, {
      response,
    });

    return response;
  }
}

module.exports = new FactionInfoRepository();
