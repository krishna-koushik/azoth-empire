const { players } = require("../mongodb/mongoose/models");

class PlayerInfoRepository {
  constructor() {}

  async findPlayerByDiscordId(discordId) {
    console.log(`fetching player info for discord id ${discordId}`);

    return await players.findOne({ "discord.id": `${discordId}` }).exec();
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
    console.info("finished inserting documents in mongodb.", {
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
}

module.exports = new PlayerInfoRepository();
