const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
const { capitalize } = require("../../lib/utils");

class WarAttendance {
  constructor() {}

  handleInteraction(interaction) {
    const { guild, user } = interaction;

    // const row = new MessageActionRow()
    //     .addComponents(
    //         new MessageButton()
    //             .setCustomId('roster')
    //             .setLabel('Roster')
    //             .setStyle('PRIMARY'),
    //     )
    //     .addComponents(
    //         new MessageButton()
    //             .setCustomId('performance')
    //             .setLabel('Performance Report')
    //             .setStyle('SECONDARY'),
    //     );

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select-war")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "War: Aeternity v/s DSF",
            description: "Friday, Jul 30 8:30 PM to 9:00 PM",
            value: "war primary key 1",
          },
          {
            label: "Invasion: Fort Everfall",
            description: "Wed, Dec 31, 9:00 PM to 9:30 PM",
            value: "war primary key 2",
          },
        ])
    );

    //TODO: Step 1: Get the current user discord name
    // Step 2: Make a database call and fetch the stats stored for the player
    // Step 3: Format and display the stats

    // const player = {
    //   name: "Bodnapa",
    //   discord: {
    //     name: "Bodnapa#0001",
    //     id: "157656638973542400",
    //   },
    //   guild: "Unbroken",
    //   gameData: {
    //     level: 15,
    //     weapon: ["Musket", "Rapier"],
    //     teams: ["PVP", "Crafter", "Siege Team"],
    //     averageGs: 382,
    //     amulet: 300,
    //     ring: 420,
    //     earring: 350,
    //     bag1: 100,
    //     bag2: 100,
    //     bag3: 100,
    //     helm: 300,
    //     chest: 250,
    //     hands: 425,
    //     pants: 600,
    //     boots: 100,
    //     shield: 0,
    //     attribute: {
    //       primary: "Dexterity",
    //       secondary: "Constituion",
    //       preferredWeightClass: "Medium",
    //     },
    //     skills: {
    //       trade: {
    //         jewel: 20,
    //         engineering: 250,
    //         food: 205,
    //         armoring: 50,
    //         weaponsmithing: 45,
    //         arcana: 10,
    //         furnishing: 100,
    //         stone: 100,
    //       },
    //       gathering: {
    //         smelting: 120,
    //         woodworking: 250,
    //         weaving: 205,
    //         leatherworking: 150,
    //         logging: 145,
    //         mining: 100,
    //         harvesting: 130,
    //         skinning: 100,
    //         fishing: 0,
    //       },
    //     },
    //   },
    //   active: true,
    // };
    //
    // const playerStatsEmbed = new MessageEmbed();
    //
    // if (!!player.active) {
    //   playerStatsEmbed.setColor("#0099ff");
    // } else {
    //   playerStatsEmbed.setColor("#ff0033");
    // }
    //
    // playerStatsEmbed
    //   .setTitle(player.name)
    //   .setAuthor(player.discord.name, user.avatarURL())
    //   .setURL("https://newworld.com/");
    //
    // playerStatsEmbed.addFields(
    //   { name: "Guild", value: player.guild },
    //   { name: "Level", value: player.gameData.level.toString() }
    // );
    //
    // player.gameData.weapon.forEach((w, index) => {
    //   playerStatsEmbed.addField(`Weapon ${index + 1}`, w, true);
    // });
    //
    // playerStatsEmbed.addFields([
    //   { name: "Skills", value: "Trade" },
    //   { name: "\u200B", value: "\u200B" },
    // ]);
    //
    // Object.keys(player.gameData.skills.trade).forEach((key) => {
    //   playerStatsEmbed.addField(
    //     capitalize(key),
    //     player.gameData.skills.trade[key].toString(),
    //     true
    //   );
    // });
    //
    // playerStatsEmbed.addFields([
    //   { name: "Skills", value: "Gathering" },
    //   { name: "\u200B", value: "\u200B" },
    // ]);
    //
    // Object.keys(player.gameData.skills.gathering).forEach((key) => {
    //   playerStatsEmbed.addField(
    //     capitalize(key),
    //     player.gameData.skills.gathering[key].toString(),
    //     true
    //   );
    // });

    return { components: [row], content: "Here are the last 5 wars" };
  }
}

module.exports = new WarAttendance();
