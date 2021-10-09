const Base = require("./Base")

const User = require('./User')

const { Client } = require("../index")

const DataStore = require('../util/DataStore')

class GuildMember {
	/**
	 * @param {Object} obj
	 * @param {Client} client
	 */
	constructor(obj, user, client) {

		this.client = client;

		this.nickname = obj.nickname
		this.roles = new DataStore()

		this.guild;
	
		this.user = new User(user);

		for (const id of obj.roles) {
			
		}
	}

	get displayName() {
		if (typeof this.nickname == "undefined" || this.nickname == null) return this.user.username;

		return this.nickname;
	}

	kick(reason) {
		return new Promise((resolve,reject) => {
			this.client.rest.delete(`/guilds/${this.guild.id}/members/${this.user.id}`, reason)
			.then(json => {
				resolve(this)
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}

module.exports = GuildMember