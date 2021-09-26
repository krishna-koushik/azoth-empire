const SetupMyPlayer = require('../command-handlers/setup-my-player');

module.exports = {
    name: 'update-player-name',
    description: 'update my player name',
    async execute(interaction) {
        interaction.reply('What is your in game name?', { fetchReply: true }).then(async () => {
            await SetupMyPlayer.handleInteraction(interaction);
        });
    },
};
