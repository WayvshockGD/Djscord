const DataStore = require('./DataStore')

class UserStore {
	constructor() {
		// super()

		this.cache = new DataStore()
	}
}

class GuildStore {
	constructor() {
		// super()

		this.cache = new DataStore()
	}
}

class ChannelStore {
	constructor() {
		// super()

		this.cache = new DataStore()
	}
}

class InteractionManager {
	constructor() {
		this.commands = new DataStore()
	}
}

module.exports = {
	UserStore,
	GuildStore,
	ChannelStore,
	InteractionManager
}