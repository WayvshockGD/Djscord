var { createAudioPlayer, createAudioResource } = require('@discordjs/voice')

var Dispatcher = require('./Dispatcher')

const { Readable } = require('stream')

var ytdl;

try {
	ytdl = require('ytdl-core')
} catch (e) {
	if (e.code !== "MODULE_NOT_FOUND") {
		throw e;
	}

	ytdl = null;
}

module.exports = class {
	constructor(client, channel) {
		this.client = client;
		this.channel = channel;
	}

	play(input) {
		var resource;

		var connection = this.client.voice.getVoiceConnection(this.channel.guild.id)
		if (!connection) {
			this.channel.join()

			connection = this.client.voice.getVoiceConnection(this.channel.guild.id)
		}

		if (input instanceof Readable) {
			resource = createAudioResource(input, {
				inlineVolume: true
			});
		} else if (typeof input === "string") {
			if (isURL(input)) {
				// url... check to see if its an mpeg stream.
				if (input.split("?").shift().endsWith('.mp3')) {
					resource = createAudioResource(input, {
						inlineVolume: true
					})
				}
				// is it youtube? if so, check to see if ytdl is installed then download the ReadableStream.

				if (isYT(input)) {
					if (typeof ytdl == "undefined" || ytdl == null) {
						client.emit(`debug`, `ytdl-core not found, so stopping play command and returning null.`)

						return null
					} else if (typeof ytdl == "function") {
						var stream = ytdl(input, {
							filter: "audioonly",
							quality: "highestaudio"
						})

						resource = createAudioResource(stream, {
							inlineVolume: true
						});
					}
				}
			}
		}

		if (typeof resource == "undefined") return null;

		// resource.encoder.setBitrate(320000)

		var player = createAudioPlayer();

		connection.subscribe(player);

		player.play(resource);

		return new Dispatcher(this.client, resource);
	}
}

function isURL(str) {
	if (str.indexOf("http") > -1) return true;

	return false;
}

function isYT(str) {
	if (str.indexOf("youtube.com") > -1) return true;

	return false;
}