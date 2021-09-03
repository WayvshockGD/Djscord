const Channel = require('./Channel')
const Message = require('./Message')

// console.log(Channel)

class TextChannel extends Channel {
	constructor(obj, client) {
		super(obj, client)
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

	send(content) {
		return new Promise((res,rej) => {

			this.client.rest.post(`/channels/${this.id}/messages`, {
				content
			})
			.then(message => {
				var msg = new Message(message, this.client)

				res(msg)
			})
			.catch(err => {
				rej(err)
			})
		})
	}
}

module.exports = TextChannel