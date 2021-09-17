const PlayerInfoRepository = require("../../database/repository/player-info.repository");

class PlayersResolver {
  async handle() {
    const players = await PlayerInfoRepository.getPlayers({});

    return players;
  }
}

module.exports = new PlayersResolver();
