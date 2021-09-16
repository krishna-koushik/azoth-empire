const { gql } = require("apollo-server");
const PlayerSchema = require("./schemas/player.schema");
const PlayerResolver = require("./resolvers/player.resolver");

const typeDefs = gql`
  scalar Date

  ${PlayerSchema}

  type Query {
    player(id: ID!): Player
  }
`;

const resolvers = {
  Query: {
    async player(obj, args, context, info) {
      return PlayerResolver.handle(obj, args, context, info);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
