const SetMeUp = require('../command-handlers/setup-me-up');
const { fetchDiscordUser, checkIfUserHasPermissions } = require('../../lib/utils');

module.exports = {
    name: 'set-me-up',
    description: 'Setup my player and user',
    async execute(interaction) {
        const { user, guild } = interaction;

        const member = await fetchDiscordUser(guild, user);

        if (checkIfUserHasPermissions(member.roles.cache, 'leader')) {
            interaction.reply(await SetMeUp.handleInteraction(interaction));
        } else {
            interaction.reply(`${user}You do not have enough permissions. Please contact Leadership for perms.`);
        }
    },
};
