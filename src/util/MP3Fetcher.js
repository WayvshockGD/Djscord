module.exports = async (url) => {
	if (!url.split("?").shift().endsWith('.mp3')) return new Error("Not an mp3");

	var fetch = require('node-fetch');

	var r = await fetch(url, {
		method: "GET",
		headers: {
			"Accepts": "audio/mpeg"
		}
	});

	console.log(r.headers.get('content-length'))

	return r.body;

}