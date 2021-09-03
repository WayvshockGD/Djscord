const TextChannel = require('./TextChannel')

class NewsChannel extends TextChannel {
	constructor(obj, client) {
		super(obj, client)
	}
}

module.exports = NewsChannel