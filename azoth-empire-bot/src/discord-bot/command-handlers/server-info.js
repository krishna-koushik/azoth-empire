const { watermarkImage } = require('../../lib/utils');
const { MessageAttachment } = require('discord.js');
const fs = require('fs');

class SyncAeDb {
    constructor() {}

    async handleInteraction(interaction) {
        const { user } = interaction;

        const SERVER_INFO_URL = fs.readFileSync('secrets/.server-info-url', 'utf8').toString().trim();

        const bufferRes = await watermarkImage(SERVER_INFO_URL, `${user.username}#${user.discriminator}(${user.id})`);

        const attachment = new MessageAttachment(bufferRes, 'server-info.png');

        return { files: [attachment] };
    }
}

module.exports = new SyncAeDb();
