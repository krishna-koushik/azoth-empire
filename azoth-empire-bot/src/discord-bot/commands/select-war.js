const SelectWar = require("../command-handlers/select-war");

module.exports = {
  name: "select-war",
  description: "returns details about the selected war",
  async execute(interaction) {
    const response = await SelectWar.handleInteraction(interaction);
    await interaction.reply(response);
  },
};
