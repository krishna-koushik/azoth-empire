const PlayersApplicationModel = require('@application/application-model/players.application.model');
const PlayersApplicationHandler = require('@application/application-handlers/players.application.handler');

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
        async player(obj, args) {
            return PlayerInfoRepository.getById(args.id);
        },
        async players(obj, args) {
            try {
                console.log(args);
                const m = new PlayersApplicationModel(args);
                return PlayersApplicationHandler.handle(m);
            } catch (e) {
                console.error(e);
                throw new UserInputError(e.message);
            }
        },
    },
};
