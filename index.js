// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const { setStatus } = require('./utils.js');
const { token } = require('./token.json');
const client = new Client({
	intents: [
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_PRESENCES,
	],
	partials: [
		'CHANNEL'
	]
});
client.commands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./modules/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);


// Log in
client.login(token);

// Update status every x millis
setInterval(() => { setStatus(client) }, 300000);

// if sh!t goes wrong
client.on('rateLimit', r => console.warn(`${chalk.yellow('[Ratelimit]')}:`, r));
client.on('warn', w => console.warn(`${chalk.yellow('[Warn]')}:`, w));
client.on('error', e => console.error(`${chalk.yellow('[Error]')}:`, e.stack));
process.on('uncaughtException', e => console.error(`${chalk.yellow('[Error]')}:`, e.stack));
process.on('unhandledRejection', e => console.error(`${chalk.yellow('[Error]')}:`, e));
process.on('warning', e => console.warn(`${chalk.yellow('[Error]')}:`, e.stack));

// Handlers' modules
['commands', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});
