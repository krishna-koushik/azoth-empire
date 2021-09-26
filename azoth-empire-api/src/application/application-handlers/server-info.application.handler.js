const { getCurrentUser } = require('@discord/repository/discord.repository');
const { watermarkImage } = require('@lib/utils');
const fs = require('fs');

class ServerInfoApplicationHandler {
    async handle(args) {
        const { token: authToken } = args;
        const user = await getCurrentUser(authToken);

        const SERVER_INFO_URL = fs.readFileSync('secrets/.server-info-url', 'utf8').toString().trim();

        return watermarkImage(SERVER_INFO_URL, `${user.username}#${user.discriminator}(${user.id})`);
    }
}

module.exports = new ServerInfoApplicationHandler();
