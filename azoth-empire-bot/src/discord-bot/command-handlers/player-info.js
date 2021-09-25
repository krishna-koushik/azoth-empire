const { MessageEmbed } = require('discord.js');
const { capitalize } = require('../../lib/utils');

const PlayerInfoRepository = require('../../database/repository/player-info.repository');

class PlayerInfo {
    constructor() {}

    async handleInteraction(interaction) {
        const { guild, user } = interaction;
        console.log(user);
        //TODO: Step 1: Get the current user discord name
        // Step 2: Make a database call and fetch the stats stored for the player
        // Step 3: Format and display the stats

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

            if (!!player.gameData) {
                playerStatsEmbed.addField('Level', player.gameData.level.toString());

                player.gameData.weapon.forEach((w, index) => {
                    playerStatsEmbed.addField(`Weapon ${index + 1}`, w, true);
                });

                playerStatsEmbed.addFields([
                    { name: 'Skills', value: 'Trade' },
                    { name: '\u200B', value: '\u200B' },
                ]);

                Object.keys(player.gameData.skills.trade).forEach(key => {
                    playerStatsEmbed.addField(capitalize(key), player.gameData.skills.trade[key].toString(), true);
                });

                playerStatsEmbed.addFields([
                    { name: 'Skills', value: 'Gathering' },
                    { name: '\u200B', value: '\u200B' },
                ]);

                Object.keys(player.gameData.skills.gathering).forEach(key => {
                    playerStatsEmbed.addField(capitalize(key), player.gameData.skills.gathering[key].toString(), true);
                });
            }

            return { embeds: [playerStatsEmbed] };
        } else {
            return 'Player info does not exists. Please contact Leadership and get yourself added to AE bot database.';
        }
    }
}

module.exports = new PlayerInfo();
