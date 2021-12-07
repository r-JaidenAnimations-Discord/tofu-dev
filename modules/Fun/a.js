const { memberIDs: { shrimpID } } = require('../../constants.json');

module.exports = {
	name: 'a',
	category: 'Fun',
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== shrimpID) return message.channel.send('ahahahhahahah are you shrimp? Only the all mighty shrimp can use this almighty command! **vanish**');

		message.channel.send('a.');
	},
};
