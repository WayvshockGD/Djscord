const User = require('./User')

const Gateway = require('../gateway/websocket.js')

class ClientUser extends User {
	constructor(obj, client) {
		super(obj, client)
	}

	setStatus(status) {
		Gateway.setStatus(this.client, status)
	}

	setUsername(username) {
		
	}
}

module.exports = ClientUser