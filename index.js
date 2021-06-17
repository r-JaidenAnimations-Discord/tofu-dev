// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('#tantrum');
const chalk = require('chalk');
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./modules/');
client.config = require('./config.json');

// Log in
client.login(client.config.apiKey);

client.on('warn', w => {
	console.warn(`${chalk.yellow('[Warn]')}: ${w}`);
	new Tantrum(client, 'index.js', '[WARN]: Unspecified warning', w);
});
client.on('error', e => {
	console.error(`${chalk.redBright('[ERROR]')}: ${e.stack}`);
	new Tantrum(client, 'index.js', `[ERROR]: Unspecified error: ${e.stack}`, e);
});
process.on('uncaughtException', e => console.error(`${chalk.redBright('[Error]')}: ${e.stack}`));
process.on('unhandledRejection', e => console.error(`${chalk.redBright('[Error]')}: ${e.stack}`));
process.on('warning', e => console.warn(`${chalk.yellow('[Error]')}: ${e.stack}`));

// Handlers' modules
['commands', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
