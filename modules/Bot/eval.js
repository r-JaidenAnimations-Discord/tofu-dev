const { colors: { tofuGreen, tofuError }, memberIDs: { teraID, maxID } } = require('../../constants.json');
const { MessageEmbed } = require('discord.js');
const beautify = require('beautify');
// NOTE TO SELF: THIS IS SOME DANGEROUS $HIT RIGHT HERE, MAKE A MISTAKE AND POOF, THERE GOES THE API KEY. DO NOT UNDERESTIMATE THE POWER OF THIS COMMAND!!!!!!!

module.exports = {
	name: 'evil',
	category: 'Bot',
	cooldown: 0,
	execute: async function(client, message, args) {

		if (![teraID, maxID].includes(message.author.id)) {
			return message.channel.send('No dude. I don\'t want anyone but my masters mess with code in the bot...');
		}

		if (!args[0]) return message.channel.send('Give me something to evaluate tho');

		try {
			const toEval = args.join(' ');
			let evaluated = eval(toEval);
			evaluated = (evaluated + '').replace(client.token, 'funny token time');
			if (['token', 'key', 'apikey'].includes(toEval.toLowerCase())) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');

			const embed = new MessageEmbed()
				.setColor(tofuGreen)
				.setTimestamp()
				.setTitle('Eval')
				.addField('To Evaluate', `\`\`\`js\n${beautify(toEval, { format: 'js' })}\n\`\`\``)
				.addField('Evaluated', `${evaluated}`)
				.addField('Type of', typeof (evaluated))
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send({ embeds: [embed] });
		} catch (e) {
			const embed = new MessageEmbed()
				.setColor(tofuError)
				.setTitle('Error')
				.setDescription(e.toString())
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send({ embeds: [embed] });
		}

		// ... all your eval shit
	},
};
