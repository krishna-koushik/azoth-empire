const { Readable } = require('stream');
const { getCurrentUser } = require('@discord/repository/discord.repository');
const { watermarkImage } = require('@lib/utils');

class ServerInfoApplicationHandler {
    async handle(args) {
        const { token: authToken } = args;
        const user = await getCurrentUser(authToken);

        const buffer = await watermarkImage('secrets/.server-info.png', `${user.username}#${user.discriminator}(${user.id})`);

        const readable = new Readable();
        readable._read = () => {};
        readable.push(buffer);
        return readable;
    }
}

module.exports = new ServerInfoApplicationHandler();
