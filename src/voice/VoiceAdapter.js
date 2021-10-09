const { } = require('../util/Constants')

var adapters = new Map()
var trackedClients = new Set()

function trackClient(client) {
	if (trackedClients.has(client)) return;

	trackedClients.add(client);

	client.ws.socket.on('message', (payload) => {
		payload = JSON.parse(payload) || payload

		if (payload.op !== 0) return;

		// console.log(payload)

		if (payload.t == "VOICE_SERVER_UPDATE") {
			adapters.get(payload.d.guild_id).onVoiceServerUpdate(payload.d)
		}

		if (payload.t == "VOICE_STATE_UPDATE") {
			// console.log(payload)
			if (payload.d.guild_id && payload.d.session_id && payload.d.user_id === client.user.id && adapters.get(payload.d.guild_id) != null) {
				adapters.get(payload.d.guild_id).onVoiceStateUpdate(payload.d);
			}
		}
	});

	// client.ws.socket.on('SHARD_DISCONNECT', (_, shardId) => {

	// 	const guilds = trackedShards.get(shardId);
	// 	if (guilds) {
	// 		for (const guildID of guilds.values()) {
	// 			adapters.get(guildID).destroy();
	// 		}
	// 	}
	// 	trackedShards.delete(shardID);
	// })
}

const trackedShards = new Map();

function trackGuild(guild) {
	let guilds = trackedShards.get(guild.shardID);
	if (!guilds) {
		guilds = new Set();
		trackedShards.set(guild.shardID, guilds);
	}
	guilds.add(guild.id);
}

module.exports =
	function createVoiceAdapter(channel) {
		return (methods) => {
			adapters.set(channel.guild.id, methods);
			trackClient(channel.client);
			// trackGuild(channel.guild);
			return {
				sendPayload: (data) => {
					channel.client.ws.socket.send(JSON.stringify(data));

					return true;
				},
				destroy: () => {
					return adapters.delete(channel.guild.id);
				},
			};
		};
	}