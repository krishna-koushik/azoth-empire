const SyncAeDb = require('../command-handlers/sync-ae-db');
const { fetchDiscordUser, checkIfUserHasPermissions } = require('../../lib/utils');

module.exports = {
    name: 'sync-ae-db',
    description: 'Sync Azoth Empire Database with Discord server.',
    async execute(interaction) {
        const { user, guild } = interaction;
        const member = await fetchDiscordUser(guild, user);

        if (checkIfUserHasPermissions(member.roles.cache, 'Leaders') || checkIfUserHasPermissions(member.roles.cache, 'AE Leaders')) {
            interaction.reply('Ok. Sync started. Will DM you when done.');
            await SyncAeDb.handleInteraction(interaction);
        } else {
            interaction.reply(`${user}, You do not have enough permissions. Please contact Leadership for perms.`);
        }
    },
};
