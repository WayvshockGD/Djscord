const ClientUser = require('../structs/ClientUser')
const Message = require('../structs/Message')
const Guild = require('../structs/Guild')
const Channel = require('../structs/Channel')
const User = require('../structs/User')
const DataStore = require('../util/DataStore')
const { UserStore, GuildStore, ChannelStore } = require('../util/Stores')
const TextChannel = require('../structs/TextChannel')
/*
const NewsChannel = require('../structs/NewsChannel')
const VoiceChannel = require('../structs/VoiceChannel')
const StoreChannel = require('../structs/StoreChannel')
const CategoryChannel = require('../structs/CategoryChannel')
const NewsThread = require('../structs/NewsThread')
const Thread = require('../structs/Thread')
const StageChannel = require('../structs/StageChannel')
*/
const { types } = require("../util/Constants").Structures.Channel

module.exports = {
	ready: (client, data) => {
		data = data.d

		// console.log(data)

		client.user = new ClientUser(data.user, client)

		for (var guild of data.guilds) {
			client.guilds.cache.set(guild.id, { ready: false })
		}

		client.emit("ready")
	},

	guildCreate: (client, data) => {
		data = data.d

		let channels = new ChannelStore()

		for (var channel of data.channels) {
			switch (types[channel.type].toLowerCase()) {
				case 'guild_text':
					client.channels.cache.set(channel.id, new TextChannel(channel, client))

					channels.cache.set(channel.id, new TextChannel(channel, client))
					break;

				case "guild_voice":
					/*
					client.channels.cache.set(channel.id, new VoiceChannel(channel, client))

					channels.cache.set(channel.id, new VoiceChannel(channel, client))
					*/
				break;

				case "guild_category":
					/*
					client.channels.cache.set(channel.id, new CategoryChannel(channel, client))

					channels.cache.set(channel.id, new CategoryChannel(channel, client))
					*/
				break;

				case "guild_news":
					/*
						client.channels.cache.set(channel.id, new NewsChannel(channel, client))

						channels.cache.set(channel.id, new NewsChannel(channel, client))
					*/
				break;

				case "guild_store":
					/*
					client.channels.cache.set(channel.id, new StoreChannel(channel, client))

					channels.cache.set(channel.id, new StoreChannel(channel, client))
					*/
				break;

				case "guild_news_thread":
					/*
					client.channels.cache.set(channel.id, new NewsThread(channel, client))

					channels.cache.set(channel.id, new NewsThread(channel, client))
					*/
				break;

				case "guild_public_thread":
					/*
					client.channels.cache.set(channel.id, new Thread(channel, client))

					channels.cache.set(channel.id, new Thread(channel, client))
					*/
				break;

				case "guild_private_thread":
					/*
					client.channels.cache.set(channel.id, new Thread(channel, client))

					channels.cache.set(channel.id, new Thread(channel, client))
					*/
				break;

				case "guild_stage_voice":

				break;
			}
		}

		let members = new DataStore()

		for (const member of data.members) {
			client.users.cache.set(member.user.id, new User(member.user, client))

			members.set(member.id, member/* new GuildMember()*/)
		}

		if (client.guilds.cache.has(data.id) && client.guilds.cache.get(data.id).ready == false) {
			data.channels = channels;
			data.members = members;

			data.ready = true;

			client.guilds.cache.set(data.id, new Guild(data, client));
			client.emit('guildAvailable', new Guild(data, client));
		} else {
			client.guilds.cache.set(data.id, new Guild(data, client));
			client.emit('guildCreate', new Guild(data, client));
		}

	},

	message: (client, data) => {
		data = data.d

		var msg = new Message(data, client)
		msg.guild = client.guilds.cache.get(data.guild_id)
		msg.channel = client.channels.cache.get(data.channel_id)

		client.emit('message', msg)
	},

	interactionCreate: (client, data) => {
		data = data.d

		client.emit('interactionCreate', data)
	}
}