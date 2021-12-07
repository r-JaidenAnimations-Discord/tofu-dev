const { colors: { tofuGreen }, memberIDs: { maxID, teraID }, config: { botProfile } } = require('../../constants.json');
const { version } = require('../../package.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'about',
	category: 'Bot',
	aliases: ['bot', 'botinfo', 'info'],
	cooldown: 20,
	execute: async function(client, message, args) {
		const { heapUsed, heapTotal } = process.memoryUsage();

		// Uptime calculations
		let seconds = Math.floor(process.uptime()); // Math.floor(message.client.uptime / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		const aboutEmbed = new MessageEmbed()
			.setColor(tofuGreen)
			.setAuthor('About Tofu Bot', botProfile)
			.addFields(
				{ name: 'Bot version:', value: version },
				{ name: 'Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
				{ name: 'Memory Usage', value: `${(heapUsed / 1024 / 1024).toFixed(1)} MB / ${(heapTotal / 1024 / 1024).toFixed(1)}MB (${(heapUsed / heapTotal * 100).toFixed(2)}%)` },
				{ name: 'Coding:', value: `<@${maxID}> and <@${teraID}>` },
			)
			.setFooter('Made with ☕, without swear words');

		message.channel.send({ embeds: [aboutEmbed] });
	},
};
