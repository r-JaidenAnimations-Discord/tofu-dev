const { Collection } = require('discord.js');
const { simpleDuration } = require('../../utils.js');
const { config: { prefix } } = require('../../constants.json');

module.exports = async (client, message) => {
	// Bots shall not trigger me
	if (message.author.bot) return;

	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Is this command allowed inside DM?
	if (message.channel.type === 'DM') return;

	// Does the message not start with the prefix or is this not a command?
	if (!message.content.toLowerCase().startsWith(prefix) || !command) return;

	// Cooldown?
	const cooldowns = client.cooldowns;
	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) return message.reply(`WOAH, chill a bit for ${simpleDuration(expirationTime - now)} before reusing \`${command.name}\`. Thanks.`);
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (e) {
		new Error(e);
		return message.reply('I broke');
	}
};
