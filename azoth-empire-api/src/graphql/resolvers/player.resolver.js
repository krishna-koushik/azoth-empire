const ConnectionModel = require('@application/application-model/connection.model');
const ConnectionHandler = require('@application/application-handlers/connection.handler');

const PlayerInfoRepository = require('../../database/repository/player-info.repository');
const { UserInputError } = require('apollo-server');

module.exports = {
    PlayerOrderField: {
        NAME: 'name',
        GUILD_NAME: 'guild',
        JOIN_DATE: 'joinDate',
        ACTIVE: 'active',
    },
    PlayerEdge: {
        node: obj => PlayerInfoRepository.getById(obj.node),
    },
    Query: {
        async player(obj, args, context) {
            const { event: { requestContext } = {} } = context;
            if (!requestContext) {
                return null;
            }

            return PlayerInfoRepository.getById(args.id);
        },
        async players(obj, args, context) {
            const { event: { requestContext } = {} } = context;
            if (!requestContext) {
                return null;
            }
            try {
                const m = new ConnectionModel(args);
                return new ConnectionHandler('players').handle(m);
            } catch (e) {
                console.error(e);
                throw new UserInputError(e.message);
            }
        },
    },
};
