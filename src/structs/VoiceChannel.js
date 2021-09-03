const Channel = require('./Channel')

class VoiceChannel extends Channel {
	constructor(obj, client) {
		super(obj, client)

		
	}

	connect() {
		return new Promise((resolve,reject) => {

		})
	}
}

module.exports = VoiceChannel