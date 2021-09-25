const PlayerInfoRepository = require('../../database/repository/player-info.repository');

class LoginApplicationHandler {
    async handle(args) {
        const { token, user } = args;
        const { _id, discord: { roles = [] } = {} } = await PlayerInfoRepository.findPlayerByDiscordId(user.id);
        return {
            token,
            id: _id,
            roles,
        };
    }
}

module.exports = new LoginApplicationHandler();
