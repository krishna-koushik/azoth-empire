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
    const { guild, user, values } = interaction;

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`roster:${values[0]}`)
          .setLabel("Roster")
          .setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId(`performance:${values[0]}`)
          .setLabel("Performance Report")
          .setStyle("SECONDARY")
      );

    const warDetailEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(values[0]);

    return { components: [row], embeds: [warDetailEmbed] };
  }
}

module.exports = new WarAttendance();
