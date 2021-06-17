/**
 * Command handler
 * Requires and triggers a command from the ./modules/ directory when it is inputed by a user next to the prefix
 * Not included in this file but in `index.js`, but there also is a collection with all commands at the time of node.
 * If a user inputs a wrong command (incorrect command.name or command.aliases) it will not trigger anything
 * This piece of code is made by TeraBytes
 */

const { readdirSync } = require('fs');
const ascii = require('ascii-table');

let table = new ascii('Commands');
table.setHeading('Command', 'Load Status');

module.exports = bot => {
	readdirSync('./modules/').forEach(dir => {
		const commands = readdirSync(`./modules/${dir}/`).filter(file => file.endsWith('.js'));
		for (let file of commands) {
			let pull = require(`../modules/${dir}/${file}`);
			if (pull.name) {
				bot.commands.set(pull.name, pull);
				table.addRow(file, '✔   Loaded');
			}
			else {
				table.addRow(file, 'X   Not loaded -> missing a help.name, or help.name is not a string.');
				continue;
			}
			if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
		}
	});
	console.log(table.toString());
};
