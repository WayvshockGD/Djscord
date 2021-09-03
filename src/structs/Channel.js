const { types } = require('../util/Constants').Structures.Channel

const TextChannel = require('./TextChannel')
const VoiceChannel = require('./VoiceChannel')

class Channel {
	constructor(obj, client) {
		this.client = client

		this.name = obj.name
		this.type = obj.type
		this.guild = client.guilds.cache.get(obj.guild_id)
		this.position = obj.position
		this.id = obj.id

	}

	edit(obj, reason) {
		return new Promise((resolve,reject) => {
			this.client.rest.patch(`/channels/${this.id}`, obj, reason)
			.then(json => {
				switch(types[json.type].toLowerCase()) {
					case "guild_text":
						var c = new TextChannel(json, this.client)
						this.client.channels.cache.set(this.id, c)
						this.guild.channels.cache.set(this.id, c)
						resolve(c)
					break;

					case "guild_voice": 
						var c2 = new VoiceChannel(json, this.client)
						this.client.channels.cache.set(this.id, c2)
						this.guild.channels.cache.set(this.id, c2)
						resolve(c2)
					break;
				}
			})
		})
	}
}

module.exports = Channel