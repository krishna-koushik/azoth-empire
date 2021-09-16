const SetupMyPlayer = require("../command-handlers/setup-my-player");

module.exports = {
  name: "setup-my-player",
  description: "Setup my player",
  async execute(interaction) {
    interaction
      .reply("What is your in game name?", { fetchReply: true })
      .then(async () => {
        await SetupMyPlayer.handleInteraction(interaction);
      });
  },
};
