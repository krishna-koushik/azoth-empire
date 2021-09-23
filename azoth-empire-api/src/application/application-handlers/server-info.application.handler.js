const { getCurrentUser } = require('@discord/repository/discord.repository');
const { watermarkImage } = require('@lib/utils');

class ServerInfoApplicationHandler {
    async handle(args) {
        const { token: authToken } = args;
        const user = await getCurrentUser(authToken);

        return watermarkImage('secrets/.server-info.png', `${user.username}#${user.discriminator}(${user.id})`);
    }
}

module.exports = new ServerInfoApplicationHandler();
