const WarAttendance = require("../command-handlers/war-attendance");

module.exports = {
  name: "war-attendance",
  description: "Returns list of past 5 wars where you could ask for more data.",
  async execute(interaction) {
    const response = await WarAttendance.handleInteraction(interaction);
    await interaction.reply(response);
  },
};
