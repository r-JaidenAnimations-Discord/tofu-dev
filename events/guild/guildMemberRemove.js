const { leaveMessages, config: { generalChannelID } } = require('../../constants.json');
const { setStatus } = require('../../utils.js');

module.exports = async (client, member) => {
	setStatus(client);
	const randomBye = leaveMessages[Math.floor(Math.random() * leaveMessages.length)];
	const formatBye = randomBye.replace('{user}', `**${member.displayName}**`);
	client.channels.cache.get(generalChannelID).send(formatBye);
};
