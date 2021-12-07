module.exports = {
	name: 'ping',
	category: 'Bot',
	aliases: ['delay', 'latency'],
	cooldown: 5,
	execute: async function(client, message, args) {
		const msg = await message.channel.send('Pinging...');
		msg.edit(`Pong!\nLatency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency (Bot): ${client.ws.ping}ms`);
	},
};
