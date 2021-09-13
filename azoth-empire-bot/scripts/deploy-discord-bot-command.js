require("dotenv").config(); //initialize dotenv
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { CLIENT_ID, CLIENT_TOKEN, GUILD_ID } = process.env;
const fs = require("fs");

const commandFiles = fs
  .readdirSync("./src/discord-bot/commands")
  .filter((file) => file.endsWith(".js"));
let commands = [];
for (const file of commandFiles) {
  const command = require(`../src/discord-bot/commands/${file}`);
  commands.push(
    new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description)
  );
}

commands = commands.map((command) => command.toJSON());

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
