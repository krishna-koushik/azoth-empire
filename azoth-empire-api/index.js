require("module-alias/register");
require("dotenv").config(); //initialize dotenv
const { NODE_ENV } = process.env;
const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} = require("apollo-server-core");
const Boom = require("@hapi/boom");
const {
  getOauthToken,
  getCurrentUserGuilds,
} = require("@discord/repository/discord.repository");

const Server = require("@database/mongodb/mongoose/server");

const { typeDefs, resolvers } = require("@graphql/definitions");
const fs = require("fs");

// const privateKey  = fs.readFileSync('secrets/server.key', 'utf8');
// const certificate = fs.readFileSync('secrets/server.crt', 'utf8');
//
// const credentials = {key: privateKey, cert: certificate};

async function authenticate(authToken, xTokenCode) {
  try {
    if (!authToken && !xTokenCode) {
      throw Boom.unauthorized("Authentication token required");
    }

    let credentials = await new Promise(async (resolve, reject) => {
      // We are working with discord token
      if (xTokenCode) {
        authToken = await getOauthToken(xTokenCode);
      }

      if (authToken) {
        const res = await getCurrentUserGuilds(authToken);
        // console.log(res)
      } else {
        throw Boom.unauthorized("Authentication token required");
      }
    });

    return { credentials };
  } catch (error) {
    if (!error.isBoom) {
      console.error("Unexpected authorization error", error);
    }

    throw error;
  }
}

const server = new ApolloServer({
  plugins: [
    NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  typeDefs,
  resolvers,
  context: async (args) => {
    const {
      req: { body },
    } = args;
    const { operationName } = body;
    let event = args.req.body.variables;
    if (operationName !== "operationName") {
      try {
        const { authorization, "x-token-code": xTokenCode } = args.req.headers;
        const { credentials } = await authenticate(authorization, xTokenCode);

        event.requestContext = {
          authorizer: {},
        };
        return {
          headers: args.req.headers,
          event,
        };
      } catch (e) {
        console.error(e);
      }
    }

    return {
      headers: args.req.headers,
      event,
    };
  },
  introspection: NODE_ENV !== "production",
  playground: NODE_ENV !== "production",
});

Server.checkAndConnect()
  .then(() => {
    return server.listen();
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
