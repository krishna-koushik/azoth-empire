const PlayerInfo = require('../command-handlers/player-info');

module.exports = {
    name: 'player-info',
    description: 'Returns your player stats.',
    async execute(interaction) {
        const { user } = interaction;
        await interaction.reply('ok');
        const response = await PlayerInfo.handleInteraction(interaction);
        user.send(response);
    },
};
