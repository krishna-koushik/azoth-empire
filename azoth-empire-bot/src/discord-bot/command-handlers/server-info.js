const { watermarkImage } = require('../../lib/utils');
const { MessageAttachment } = require('discord.js');

class SyncAeDb {
    constructor() {}

    async handleInteraction(interaction) {
        const { user } = interaction;
        const bufferRes = await watermarkImage('secrets/.server-info.png', `${user.username}#${user.discriminator}(${user.id})`);

        const attachment = new MessageAttachment(bufferRes, 'server-info.png');

        return { files: [attachment] };
    }
}

module.exports = new SyncAeDb();
