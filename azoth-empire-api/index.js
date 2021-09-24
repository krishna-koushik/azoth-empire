require('module-alias/register');
require('dotenv').config(); //initialize dotenv
const { NODE_ENV } = process.env;
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled, ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const Boom = require('@hapi/boom');
const { getOauthToken, getCurrentUser } = require('@discord/repository/discord.repository');
const express = require('express');
const http = require('http');
const app = express();
const ServerInfoApplicationModel = require('@application/application-model/server-info.application.model');
const ServerInfoApplicationHandler = require('@application/application-handlers/server-info.application.handler');

app.get('/server-info', async (req, res) => {
    const { authorization } = req.headers;
    const { token } = req.query;

    if (!authorization && !token) {
        throw Boom.unauthorized('You are not ready. This is the way!');
    }

    try {
        const model = new ServerInfoApplicationModel(token || authorization);
        const response = await ServerInfoApplicationHandler.handle(model);

        res.setHeader('content-type', 'image/jpeg');
        res.end(response);
    } catch (e) {
        console.error(e);
        throw res.sendStatus(401);
    }
});

const httpServer = http.createServer(app);

const DbServer = require('@database/mongodb/mongoose/server');
const PlayerInfo = require('@database/repository/player-info.repository.js');

const path = require('path');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './src/graphql/schemas')), { all: true });
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './src/graphql/resolvers/*.resolver.js')));

async function authenticate(authToken, xTokenCode) {
    try {
        if (!authToken && !xTokenCode) {
            throw Boom.unauthorized('You are not ready. This is the way!');
        }

        let credentials = await new Promise(async (resolve, reject) => {
            try {
                if (xTokenCode) {
                    authToken = await getOauthToken(xTokenCode);
                    if (!authToken) {
                        throw Boom.unauthorized('You are not ready. This is the way!');
                    }
                }

                if (authToken) {
                    const res = await getCurrentUser(authToken);
                    const { appData: { login = false } = {} } = await PlayerInfo.findPlayerByDiscordId(res.id);
                    if (!login) {
                        throw Boom.unauthorized('You are not ready. This is the way!');
                    }
                    resolve({
                        authToken,
                        user: res,
                    });
                } else {
                    throw Boom.unauthorized('You are not ready. This is the way!');
                }
            } catch (e) {
                reject(e);
            }
        });

        return { credentials };
    } catch (error) {
        if (!error.isBoom) {
            console.error('Unexpected authorization error', error);
        }

        throw Boom.unauthorized('You are not ready. This is the way!');
    }
}

const server = new ApolloServer({
    plugins: [
        NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    typeDefs,
    resolvers,
    context: async args => {
        const {
            req: { body },
        } = args;
        const { operationName } = body;
        let event = args.req.body.variables || {
            requestContext: {},
        };
        if (operationName !== 'IntrospectionQuery') {
            try {
                const { authorization, 'x-token-code': xTokenCode } = args.req.headers;
                const { credentials } = await authenticate(authorization, xTokenCode);

                event.requestContext = {
                    credentials,
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
    introspection: NODE_ENV !== 'production',
    playground: NODE_ENV !== 'production',
});

DbServer.checkAndConnect()
    .then(async () => {
        await server.start();
        server.applyMiddleware({ app });

        return httpServer.listen({ port: 4000 });
    })
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
