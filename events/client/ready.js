const chalk = require('chalk');
const { setStatus, pluralizeWithNumber } = require('../../utils.js');

module.exports = async (client) => {
	console.log(chalk.green(`Alive as ${client.user.tag}\nWatching ${pluralizeWithNumber('test subject', client.users.cache.size)}`));
	setStatus(client);
};
