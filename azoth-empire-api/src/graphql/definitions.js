const { gql } = require("apollo-server");
const PlayerSchema = require("./schemas/player.schema");
const PlayerResolver = require("./resolvers/player.resolver");
const PlayersResolver = require("./resolvers/players.resolver");

const typeDefs = gql`
  scalar Date

  ${PlayerSchema}

  type PlayerList {
    count: Int
    players: [Player]
  }

  type Query {
    player(id: ID!): Player
    players: PlayerList!
  }
`;

const resolvers = {
  PlayerList: {
    count: (obj) => obj.length,
    players: (obj) => obj,
  },
  Query: {
    async player(obj, args, context, info) {
      return PlayerResolver.handle(obj, args, context, info);
    },
    async players() {
      return PlayersResolver.handle();
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
