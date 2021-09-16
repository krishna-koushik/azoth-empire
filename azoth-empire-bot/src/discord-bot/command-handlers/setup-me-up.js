const FindByDiscordIdQuery = require("../../database/queries/find_by_discord_id.query");
const PlayerInfoRepository = require("../../database/repository/player-info.repository");

class PlayerInfo {
  constructor() {}

  async handleInteraction(interaction) {
    const { user } = interaction;

    try {
      await this.givePlayerLoginPerms(user.id);
      return {
        content: "You are all set. You can now login to the web portal.",
      };
    } catch (e) {
      return {
        content: "Something went wrong. Please contact Administrators.",
      };
    }
  }

  async givePlayerLoginPerms(discordId) {
    const findQuery = new FindByDiscordIdQuery(discordId);
    return PlayerInfoRepository.updatePlayerInfo(findQuery, {
      appData: { login: true },
    });
  }
}

module.exports = new PlayerInfo();
