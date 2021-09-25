const { MessageEmbed } = require('discord.js');
const FindByDiscordIdQuery = require('../../database/queries/find_by_discord_id.query');
const PlayerInfoRepository = require('../../database/repository/player-info.repository');

class SetupMyPlayer {
    constructor() {}

    async handleInteraction(interaction) {
        const { user } = interaction;

        const filter = m => m.author.id === user.id;

        interaction.channel
            .awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(async collected => {
                const playerName = collected.first().content;
                await this.updatePlayerName(user.id, playerName);
                const player = await PlayerInfoRepository.findPlayerByDiscordId(user.id);

                if (!!player) {
                    const playerStatsEmbed = new MessageEmbed();

                    if (!!player.active) {
                        playerStatsEmbed.setColor('#0099ff');
                    } else {
                        playerStatsEmbed.setColor('#ff0033');
                    }

                    playerStatsEmbed.setTitle(player.name).setAuthor(player.discord.name, user.avatarURL()).setURL('https://newworld.com/');

                    playerStatsEmbed.addField(`Guild`, player.guild);

                    return interaction.followUp({
                        content: `Updated your player name to ${playerName}`,
                        embeds: [playerStatsEmbed],
                    });
                }
            })
            .catch(() => {
                interaction.followUp('I am sorry. you took too long to answer');
            });
    }

    async updatePlayerName(discordId, name) {
        const findQuery = new FindByDiscordIdQuery(discordId);
        return PlayerInfoRepository.updatePlayerInfo(findQuery, { name });
    }
}

module.exports = new SetupMyPlayer();
