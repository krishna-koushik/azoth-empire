const PlayerInfoRepository = require("../../database/repository/player-info.repository");
const { connectionFromAggregationPipeline } = require("../utils/connection");

module.exports = {
  PlayerOrderField: {
    NAME: "name",
    GUILD_NAME: "guild",
    JOIN_DATE: "joinDate",
    ACTIVE: "active",
  },
  PlayerEdge: {
    node: (obj) => PlayerInfoRepository.getById(obj.node),
  },
  Query: {
    async player(obj, args) {
      return PlayerInfoRepository.getById(args.id);
    },
    async players(obj, args) {
      const pipeline = [];

      if (args.orderBy) {
        const { direction, field } = args.orderBy;
        pipeline.push({ $sort: { [field]: direction } });
      }

      return connectionFromAggregationPipeline(
        { pipeline, modelName: "players" },
        args
      );
    },
  },
};
