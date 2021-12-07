const { config: { tofuBotServerID, tofuSubjectRoleID } } = require('./constants.json');

/**
 * Builds a time code in h m s, omitting h and m if they are 0, rounding up s to avoid 'please wait 0 seconds'
 * @param {Number} msDuration Timestamp/timecode in milliseconds
 * @returns {String} Time in simple format
 */
const simpleDuration = (msDuration) => {
	const h = Math.floor(msDuration / 1000 / 60 / 60);
	const m = Math.floor((msDuration / 1000 / 60 / 60 - h) * 60);
	const s = Math.ceil(((msDuration / 1000 / 60 / 60 - h) * 60 - m) * 60); // Using ceil to always round up to avoid 'pls wait 0 seconds'

	return `${h ? h + 'h' : ''}${m ? m + 'm' : ''}${s}s`;
};

/**
 * Add an 's' to a word when needed
 * @param {String} word The word to be possibly pluralized
 * @param {Number} times How many times the word references
 * @returns {String} Number of how many times the word references and word either with or without 's'
 */
const pluralizeWithNumber = (word, times) => {
	return times === 1 ? `${times} ${word}` : `${times} ${word}s`;
};

/**
 * Set RPC status for the bot
 * @param {Client} client Discord client
 */
const setStatus = (client) => {
	const amountOfSubjects = client.guilds.cache.get(tofuBotServerID).roles.cache.get(tofuSubjectRoleID).members.size;

	client.user.setPresence({
		status: 'online',
		activities: [{
			name: `${amountOfSubjects} test subjects`,
			type: 'WATCHING'
		}]
	});
};

module.exports = {
	simpleDuration,
	pluralizeWithNumber,
	setStatus
};
