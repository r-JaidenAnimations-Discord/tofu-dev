const { joinMessages, config: { generalChannelID, rulesChannelID } } = require('../../constants.json');
const { setStatus } = require('../../utils.js');

module.exports = async (client, member) => {
	setStatus(client);
	const randomWelc = joinMessages[Math.floor(Math.random() * joinMessages.length)];
	const formatWelc = randomWelc.replace('{user}', `<@${member.id}>`);
	client.channels.cache.get(generalChannelID).send(`${formatWelc}\nTry checking <#${rulesChannelID}>`);
};
