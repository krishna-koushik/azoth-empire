require("dotenv").config(); //initialize dotenv
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { GUILD_ID } = process.env;
const fs = require("fs");

let CLIENT_ID = "";
let CLIENT_TOKEN = "";

try {
  CLIENT_ID = fs.readFileSync("secrets/.client-id", "utf8").toString().trim();
  CLIENT_TOKEN = fs
    .readFileSync("secrets/.client-token", "utf8")
    .toString()
    .trim();
} catch (e) {
  console.error(
    "Cannot import client id and token. Please assign appropriate values."
  );
}

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
