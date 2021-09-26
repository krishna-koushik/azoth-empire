const ServerInfo = require('../command-handlers/server-info');

module.exports = {
    name: 'server-info',
    description: 'Azoth Empire Server Info and Announcements',
    async execute(interaction) {
        const { user } = interaction;
        const response = await ServerInfo.handleInteraction(interaction);
        await interaction.reply('Ok. Will DM you the server info. Please do not share this with anyone.');
        return user.send(response);
    },
};
