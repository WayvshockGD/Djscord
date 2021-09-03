

var { ClientUser } = require('../util/Constants')

function setStatus(client, status) {
	var status = ClientUser.Status(status);

	client.ws.socket.send(JSON.stringify({
		op: 3,
		d: {
			since: null,
			activities: [],
			status,
			afk: false
		}
	}))


}

module.exports = {
	setStatus
}