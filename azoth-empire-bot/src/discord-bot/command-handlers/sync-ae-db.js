const FindByDiscordIdQuery = require('../../database/queries/find_by_discord_id.query');
const FindAllQuery = require('../../database/queries/find_all.query');
const PlayerInfoRepository = require('../../database/repository/player-info.repository');
const GuildRepository = require('../../database/repository/guild.repository');
const { fetchAllDiscordUser } = require('../../lib/utils');

class SyncAeDb {
    constructor() {}

    async handleInteraction(interaction) {
        const { guild, user } = interaction;

        const query = new FindAllQuery();
        const guilds = await GuildRepository.findByFilter(query);
        console.log(guilds);
        const res = await this.setup(guild, guilds);

        return user.send(res);
    }

    async setup(memberGuild, guilds) {
        try {
            const allGuildUsers = await fetchAllDiscordUser(memberGuild);
            console.log(guilds);
            const allPromises = allGuildUsers.map(async gMember => {
                const { user, roles } = gMember;
                if (!user.bot) {
                    const playerNameMatch = gMember.displayName.match(/^\[(.*?)\](.*?)$/);
                    let playerName = gMember.displayName;
                    let guildName = 'PAX';

                    if (!!playerNameMatch) {
                        const guild = guilds.find(g => (g.code || '').toLowerCase() === (playerNameMatch[1] || 'PAX').toLowerCase()) || 'PAX';
                        console.log(guild);
                        guildName = guild.name;
                        playerName = (playerNameMatch[2] || gMember.displayName).trim();
                    }

                    const userRoles = roles.cache.map(r => r.name);
                    const discordName = `${user.username}#${user.discriminator}`;

                    return this.updatePlayerInfo(user.id, discordName, userRoles, guildName, playerName);
                } else {
                    return user;
                }
            });
            await Promise.all(allPromises);
            return {
                content: 'All users in AE discord are synced to our database.',
            };
        } catch (e) {
            console.error(e);

            return {
                content: 'Something went wrong. Please contact Administrators.',
            };
        }
    }

    async updatePlayerInfo(discordId, discordName, roles, guildName, playerName) {
        const findQuery = new FindByDiscordIdQuery(discordId);
        return PlayerInfoRepository.updatePlayerInfo(findQuery, {
            'name': playerName,
            'discord.name': discordName,
            'discord.id': discordId,
            'discord.roles': roles,
            'guild': guildName,
        });
    }
}

module.exports = new SyncAeDb();
