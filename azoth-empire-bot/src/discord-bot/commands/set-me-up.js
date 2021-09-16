const SetMeUp = require("../command-handlers/setup-me-up");
const { fetchDiscordUser } = require("../../lib/utils");

module.exports = {
  name: "set-me-up",
  description: "Setup my player and user",
  async execute(interaction) {
    const { user, guild } = interaction;

    const member = await fetchDiscordUser(guild, user);

    if (
      member.roles.cache.some((role) => role.name.toLowerCase() === "leader")
    ) {
      interaction.reply(await SetMeUp.handleInteraction(interaction));
    } else {
      interaction.reply(
        `${user}You do not have enough permissions. Please contact Leadership for perms.`
      );
    }
  },
};
