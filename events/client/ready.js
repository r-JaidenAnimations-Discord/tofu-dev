const chalk = require('chalk');
const { pluralizeWithNumber } = require('#functions/pluralize.js');

module.exports = client => {

	console.log(chalk.green(`Alive as ${client.user.tag}\nOn ${pluralizeWithNumber('guild', client.guilds.cache.size)}\nAnnoying ${pluralizeWithNumber('hooman', client.users.cache.size)}`));

	setInterval(() => {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'the test subjects',
				type: 'WATCHING'
			}
		})
	}, 300000);

}
