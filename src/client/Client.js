const EventEmitter = require('events')
const DataStore = require('../util/DataStore')
const { UserStore, GuildStore, ChannelStore, InteractionManager } = require('../util/Stores')
const login = require('../login')
const hb = require('../gateway/heartbeat')
const rest = require('./rest/RESTManager')

const monitor = require('./Monitor')

class Client extends EventEmitter {
	constructor(options={intents: 32767}) {
		super()

		this.options = options;

		this.user = null;
		this.users = new UserStore()
		this.guilds = new GuildStore()
		this.channels = new ChannelStore()

		this.token = options.token
		this.intents = options.intents || 32767

		this.monitor = monitor;
		this.rest = new rest(this)

		this.commands = new DataStore()

		this.readyAt;

		this.ws = {
			sessionId: null,
			socket: null,
			ping: 0,
			heartbeat: {
				interval: 0,
				recieved: false,
				last: 0,
				startHeartBeat: hb
			},
		}

	}

	connect() {
		return new Promise((resolve, reject) => {
			resolve(login(this))
		})
	}
}

module.exports = Client;