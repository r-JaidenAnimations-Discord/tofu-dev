const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMessageStaff } = require('#functions/staffChecks.js');

module.exports = {
	name: 'say',
	helpTitle: 'Say',
	category: 'Fun',
	usage: 'say [#channel] (embed) [message]',
	description: 'Mess with members',
	isDMAllowed: false,
	isDeprecated: false,
	isHidden: true,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {

		let channel = message.mentions.channels.first() ||
			message.guild.channels.cache.find(c => c.id === args[0]) ||
			message.guild.channels.cache.find(c => c.name === args[0]);

		if (!checkMessageStaff(client, message)) return;

		if (!channel) {
			try {
				return message.channel.send('Where the actual F*CK do you want me to put that? My ass?');
			} catch (e) {
				throw new Tantrum(client, 'say.js', 'Error on sending channel not defined error', e);
			}
		}

		if (args[1] === 'embed') {
			if (!args.slice(2).join(' ')) {
				try {
					return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?')
				} catch (e) {
					throw new Tantrum(client, 'say.js', 'Error on sending no message error', e);
				}
			}

			const embed = new Discord.MessageEmbed()
				.setColor(tofuGreen)
				.setDescription(args.slice(2).join(' '));

			try {
				channel.send(embed);
				await message.react('✅');
			} catch (e) {
				throw new Tantrum(client, 'say.js', 'Error on sending message', e);
			}
		}
		else {
			if (!args.slice(1).join(' ')) {
				try {
					return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?');
				} catch (e) {
					throw new Tantrum(client, 'say.js', 'Error on sending no message error', e);
				}
			}
			try {
				channel.send(args.slice(1).join(' '));
				await message.react('✅');
			} catch (e) {
				throw new Tantrum(client, 'say.js', 'Error on sending message', e);
			}
		}
	},
};
