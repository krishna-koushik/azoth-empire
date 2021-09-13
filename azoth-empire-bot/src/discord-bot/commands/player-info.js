const PlayerInfo = require("../command-handlers/player-info");

module.exports = {
  name: "player-info",
  description: "Returns your player stats.",
  async execute(interaction) {
    const response = await PlayerInfo.handleInteraction(interaction);
    await interaction.reply(response);
  },
};
