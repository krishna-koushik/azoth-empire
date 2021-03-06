require('dotenv').config(); //initialize dotenv
const { Client, Intents, Collection } = require('discord.js'); //import discord.js
const fs = require('fs');
const Server = require('./src/database/mongodb/mongoose/server');
const { fetchDiscordUser, checkIfUserHasPermissions } = require('./src/lib/utils');

let CLIENT_TOKEN = '';

try {
    CLIENT_TOKEN = fs.readFileSync('secrets/.client-token', 'utf8').toString().trim();
} catch (e) {
    console.error('Cannot import client token. Please assign appropriate values.');
}

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_MESSAGES],
}); //create new client

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() && !interaction.isButton() && !interaction.isSelectMenu()) return;

    const { commandName, guild, user, customId, message, reply } = interaction;
    if (commandName) {
        if (!client.commands.has(commandName.toLowerCase())) return;
    } else if (customId) {
        const buttonName = customId.split(':')[0];
        if (!client.commands.has(buttonName.toLowerCase())) return;
    } else {
        return await message.reply('The command you are trying to run is not recognized.');
    }

    try {
        const member = await fetchDiscordUser(guild, user);
        if (
            (checkIfUserHasPermissions(member.roles.cache, 'NewWorld') ||
                checkIfUserHasPermissions(member.roles.cache, 'New World') ||
                checkIfUserHasPermissions(member.roles.cache, 'Leaders') ||
                checkIfUserHasPermissions(member.roles.cache, 'AE Leaders')) &&
            !checkIfUserHasPermissions(member.roles.cache, 'inactive')
        ) {
            if (interaction.isButton()) {
                const buttonName = customId.split(':')[0];
                client.commands.get(buttonName.toLowerCase()).execute(interaction);
            } else if (interaction.isSelectMenu()) {
                client.commands.get(customId.toLowerCase()).execute(interaction);
            } else if (interaction.isCommand()) {
                client.commands.get(commandName.toLowerCase()).execute(interaction);
            } else {
                return await reply(`Command not recognized`);
            }
        } else {
            return await reply(`You do not have enough permissions. Please contact Leadership for perms.`);
        }
    } catch (error) {
        console.error(error);
        return await reply('there was an error trying to execute that command!');
    }
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/discord-bot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/discord-bot/commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Establish the database connection.
Server.checkAndConnect().then(() => {
    //make sure this line is the last line
    client
        .login(CLIENT_TOKEN)
        .then(res => {
            console.log(res);
        })
        .catch(console.error);
});
//login bot using token
