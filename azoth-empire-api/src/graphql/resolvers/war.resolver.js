const ConnectionModel = require('@application/application-model/connection.model');
const ConnectionHandler = require('@application/application-handlers/connection.handler');

const WarInfoRepository = require('../../database/repository/war-info.repository');
const PlayerInfoRepository = require('../../database/repository/player-info.repository');

const { UserInputError } = require('apollo-server');

module.exports = {
    WarOrderField: {
        ATTACKER: 'attacker.guild',
        DEFENDER: 'defender.guild',
        WAR_TIME: 'time',
        WAR_TYPE: 'warType',
    },
    WarEdge: {
        node: obj => WarInfoRepository.getById(obj.node),
    },
    ArmyPlayer: {
        player: obj => PlayerInfoRepository.getById(obj.playerId),
    },
    Query: {
        async war(obj, args, context) {
            const { event: { requestContext } = {} } = context;
            if (!requestContext) {
                return null;
            }

            return WarInfoRepository.getById(args.id);
        },
        async wars(obj, args, context) {
            const { event: { requestContext } = {} } = context;
            if (!requestContext) {
                return null;
            }
            try {
                const m = new ConnectionModel(args);
                return new ConnectionHandler('wars').handle(m);
            } catch (e) {
                console.error(e);
                throw new UserInputError(e.message);
            }
        },
    },
};
