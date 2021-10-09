const { EventEmitter }  = require('events')

class Dispatcher extends EventEmitter {
	constructor(client, audioResource) {
		super()
		this.client = client;

		this.resource = audioResource;

		var i = setInterval(() => {
			if (this.resource.ended) {
				this.emit('end', "Track finished");
				clearInterval(i)
			}
		}, 1)
	}

	setVolume(volume) {
		return new Promise((res,rej) => {
			volume = Number(volume)
			if (isNaN(volume)) return rej(new Error(`Volume has to be a string`));
			this.resource.volume.setVolume(volume);

			res(this.resource.volume.volume)
		})
	}

}

module.exports = Dispatcher