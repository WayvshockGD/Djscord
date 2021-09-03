const { Codes } = require('../util/Constants')

module.exports = (client) => {
	client.ws.socket.on('error', (err) => {
		console.error(err)
	})

	client.ws.socket.on('close', (code, reason) => {
		var codes = Object.values(Codes.WS.Close_Codes.Gateway)

		if (codes.includes(code)) {
			console.log(reason.toString('utf-8'))
		}
	})
}