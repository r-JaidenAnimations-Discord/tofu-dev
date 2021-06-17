const Tantrum = require('#tantrum');
const { leaveMessages } = require('#commandData/greetings.json');

module.exports = async (client, member) => {
	const { generalChannelID } = client.config;

	try {
		let randomBye = leaveMessages[Math.floor(Math.random() * leaveMessages.length)];
		let formatBye = randomBye.replace('{user}', `**${member.displayName}**`);
		client.channels.cache.get(generalChannelID).send(formatBye);
	} catch (e) {
		throw new Tantrum(client, 'guildMemberRemove.js', 'Error on sending cya message', e);
	}
};
