require("dotenv").config(); //initialize dotenv
const { Client, Intents } = require("discord.js"); //import discord.js
const PlayerInfo = require("./src/discord-bot/bot-commands/player-info");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
  ],
}); //create new client

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, guild, user } = interaction;
  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else {
    const allMembers = await guild.members.fetch();
    const member = allMembers.find((m) => {
      return m.user.username === user.username;
    });

    if (
      member.roles.cache.some((role) => role.name === "New World") &&
      !member.roles.cache.some((role) => role.name === "inactive")
    ) {
      if (commandName === "server") {
        await interaction.reply(`We are currently in ${guild.name}`);
      } else if (commandName === "user") {
        await interaction.reply(`Hello ${user.username}`);
      } else if (commandName === "player-info") {
        const response = PlayerInfo.buildInteraction(interaction);
        await interaction.reply({ embeds: [response] });
      }
    } else {
      await interaction.reply(
        `You do not have enough permissions. Please contact Leadership for perms.`
      );
    }
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//make sure this line is the last line
client
  .login(process.env.CLIENT_TOKEN)
  .then((res) => {
    console.log(res);
  })
  .catch(console.error);
//login bot using token
