const Roster = require("../command-handlers/roster");

module.exports = {
  name: "roster",
  description: "Returns war roster.",
  async execute(interaction) {
    const response = await Roster.handleInteraction(interaction);
    await interaction.reply(response);
  },
};
