const Channel = require('./Channel')
const Message = require('./Message')

class TextChannel extends Channel {
	constructor(obj, client) {
		super(obj, client)
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