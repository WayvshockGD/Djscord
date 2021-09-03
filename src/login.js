const ws = require('ws')
const { Gate_Codes } = require('./util/Constants').Codes.WS

module.exports = (client) => {
	const socket = new ws("wss://gateway.discord.gg/?v=9&encoding=json")

	client.ws.socket = socket;

	client.monitor(client)

	socket.on('message', data => {
		var message = JSON.parse(data) || data

		switch (message.op) {
			case Gate_Codes.HELLO:
				client.ws.heartbeat.recieved = true;
				client.ws.heartbeat.interval = message.d.heartbeat_interval;

				client.ws.heartbeat.startHeartBeat(client)

				socket.send(JSON.stringify({
					op: Gate_Codes.IDENTIFY,
					d: {
						token: client.token,
						intents: client.intents,
						properties: {
							$os: process.platform,
							$browser: "djscord",
							$device: "djscord"
						}
					}
				}))

			break;

			case Gate_Codes.DISPATCH:
				const Events = require('./util/Constants').Gateway_Events;

				if (!Events.hasOwnProperty(message.t)) return;

				if (message.t == "READY") {
					client.readyAt = Date.now()
					client.sessionId = message.d.session_id
				}

				const e = require('./gateway/handler')[Events[message.t]]

				if (e) e(client, message)

			break;

			case Gate_Codes.HEARTBEAT_ACK:
				client.ws.heartbeat.last = Date.now()
				client.ws.heartbeat.recieved = true;
			break;
		}
	})

	return client;

}