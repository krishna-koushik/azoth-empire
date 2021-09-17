const PlayerInfoRepository = require("../../database/repository/player-info.repository");

class PlayersResolver {
  async handle(obj, args, context, info) {
    return args;
  }
}

module.exports = new PlayersResolver();
