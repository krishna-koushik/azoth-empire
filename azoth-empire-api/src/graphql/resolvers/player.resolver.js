const PlayerInfoRepository = require("../../database/repository/player-info.repository");
const { connectionFromAggregationPipeline } = require("../utils/connection");

module.exports = {
  PlayerEdge: {
    node: (obj) => PlayerInfoRepository.getById(obj.node),
  },
  Query: {
    async player(obj, args) {
      return PlayerInfoRepository.getById(args.id);
    },
    async players(obj, args) {
      return connectionFromAggregationPipeline(
        { pipeline: [], modelName: "players" },
        args
      );
    },
  },
};
