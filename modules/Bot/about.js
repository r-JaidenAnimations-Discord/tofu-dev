const { tofuGreen } = require('#colors');
const { version } = require('../../package.json');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'about',
	helpTitle: 'About',
	category: 'Bot',
	usage: 'about',
	description: 'Display the bot\'s information',
	isDMAllowed: false,
	isDeprecated: false,
	isHidden: false,
	aliases: ['bot', 'botinfo', 'info'],
	cooldown: 20,
	execute: async function(client, message, args) {
		const { releaseDate, botProfile } = client.config;

		let { heapUsed, heapTotal } = process.memoryUsage();

		// Uptime calculations
		let seconds = Math.floor(process.uptime()) //Math.floor(message.client.uptime / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);

		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		const aboutEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setAuthor('About Tofu Dev Watchdoge', botProfile)
			.addFields(
				{ name: 'Bot version:', value: version },
				{ name: 'Bot release date:', value: releaseDate },
				{ name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
				{ name: 'Memory Usage', value: `${(heapUsed / 1024 / 1024).toFixed(1)} MB / ${(heapTotal / 1024 / 1024).toFixed(1)}MB (${(heapUsed / heapTotal * 100).toFixed(2)}%)` },
				{ name: 'Coding:', value: '<@558264504736153600> and <@488064501816492047>' },
			)
			.setFooter('Made with ☕, without swear words');

		try {
			message.channel.send(aboutEmbed);
		} catch (e) {
			throw new Tantrum(client, 'about.js', 'Error on sending aboutEmbed', e);
		}
	},
};
