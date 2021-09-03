const User = require('./User')

class Message {
	constructor(obj, client) {
		this.client = client

		this.id = obj.id
		this.content = obj.content
		this.author = new User(obj.author, client)
		this.channel;
		this.guild;
	}

	delete(timeout=0) {
		setTimeout(() => {

		}, timeout)
	}

	crosspost() {

	}
}

module.exports = Message