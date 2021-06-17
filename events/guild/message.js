const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { humanReadableDuration } = require('#functions/buildTimeString.js');

module.exports = async (client, message) => {
	const { prefix } = client.config;

	let cooldowns = client.cooldowns;

	// Bots shall not trigger me
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Is this command allowed inside DM?
	if (message.guild === null && !message.author.bot) return;

	if (!command) return;

	// Is this command deprecated?
	if (command.isDeprecated === true) {
		try {
			message.reply('This command has been deprecated and will be removed soon, enjoy it while you can!');
		} catch (e) {
			throw new Tantrum(client, 'message.js', 'Error on sending deprecated command message', e);
		}
	}

	// Cooldown?
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			try {
				await message.react('⏳');
				message.reply(`It's cool you're trying to do stuff but could you chill a bit for ${humanReadableDuration(expirationTime - now)} before reusing \`${command.name}\`?`);
				return;
			} catch (e) {
				throw new Tantrum(client, 'message.js', 'Error on sending command cooldown message', e);
			}
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (e) {
		throw new Tantrum(client, 'message.js', 'Something went wrong when trying to execute a command', e);
		//message.reply('Sooo i like um broke');
	}
}
