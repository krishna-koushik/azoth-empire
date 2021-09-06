require("dotenv").config(); //initialize dotenv
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { CLIENT_ID, CLIENT_TOKEN, GUILD_ID } = process.env;
const PlayerInfo = require("../src/discord-bot/bot-commands/player-info");
console.log(PlayerInfo.buildSlashCommand());
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!"),
  PlayerInfo.buildSlashCommand(),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(CLIENT_TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
