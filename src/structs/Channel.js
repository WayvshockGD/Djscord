const { types } = require('../util/Constants').Structures.Channel

// const TextChannel = require('./TextChannel')
// const VoiceChannel = require('./VoiceChannel')

class Channel {
	constructor(obj, client) {
		this.client = client

		this.name = obj.name
		this.type = obj.type
		this.guild = client.guilds.cache.get(obj.guild_id)
		this.position = obj.position
		this.id = obj.id

	}

	
}

module.exports = Channel