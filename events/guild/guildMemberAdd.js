const Tantrum = require('#tantrum');
const { joinMessages } = require('#commandData/greetings.json');

module.exports = async (client, member) => {
	const { generalChannelID, rulesChannelID } = client.config;

	try {
		let randomWelc = joinMessages[Math.floor(Math.random() * joinMessages.length)];
		let formatWelc = randomWelc.replace('{user}', `<@${member.id}>`);
		client.channels.cache.get(generalChannelID).send(`${formatWelc}\nTry checking <#${rulesChannelID}>`);
	} catch (e) {
		throw new Tantrum(client, 'guildMemberAdd.js', 'Error on sending welcome message', e)
	}
};
