const fetch = require('node-fetch')
const { version } = require('../../../package.json')
const { API } = require('../../util/Constants')
const APIError = require('./APIError')

class RESTManager {
	constructor(client) {
		this.UserAgent = `Djscord (https://djscord.js.org, ${version})`
		this.Authorization = `Bot ${client.token}`
	}

	post(url, body, reason) {
		return new Promise((resolve, reject) => {
			var headers = {
				"User-Agent": this.UserAgent,
				"Authorization": this.Authorization,
				"Content-Type": "application/json"
			}

			if (typeof reason !== "undefined") headers["X-Audit-Log-Reason"] = reason;

			fetch(`${API.Base}${url}`, {
				method: "POST",
				headers,
				body: JSON.stringify(body)
			})
				.then(r => {
					return checkResponse(r, "POST", url)
				})
				.then(json => {
					if (json instanceof APIError) {
						reject(json)
					} else {
						resolve(json)
					}
				})
		})
	}

	get(url) {
		return new Promise((resolve, reject) => {
			var headers = {
				"User-Agent": this.UserAgent,
				"Authorization": this.Authorization,
				"Content-Type": "application/json"
			}

			fetch(`${API.Base}${url}`, {
				method: "GET",
				headers
			})
				.then(r => {
					return checkResponse(r, "GET", url)
				})
				.then(json => {
					if (json instanceof APIError) {
						reject(json)
					} else {
						resolve(json)
					}
				})
		})
	}

	patch(url, body,reason) {
		return new Promise((resolve, reject) => {
			var headers = {
				"User-Agent": this.UserAgent,
				"Authorization": this.Authorization,
				"Content-Type": "application/json"
			}

			if (typeof reason !== "undefined") headers["X-Audit-Log-Reason"] = reason;

			fetch(`${API.Base}${url}`, {
				method: "PATCH",
				headers,
				body: JSON.stringify(body)
			})
				.then(r => {
					return checkResponse(r, "PATCH", url)
				})
				.then(json => {
					if (json instanceof APIError) {
						reject(json)
					} else {
						resolve(json)
					}
				})
		})
	}

	put(url, body,reason ) {
		return new Promise((resolve, reject) => {
			var headers = {
				"User-Agent": this.UserAgent,
				"Authorization": this.Authorization,
				"Content-Type": "application/json"
			}

			if (typeof reason !== "undefined") headers["X-Audit-Log-Reason"] = reason;

			fetch(`${API.Base}${url}`, {
				method: "PUT",
				headers,
				body: JSON.stringify(body)
			})
				.then(r => {
					return checkResponse(r, "PUT", url)
				})
				.then(json => {
					if (json instanceof APIError) {
						reject(json)
					} else {
						resolve(json)
					}
				})
		})
	}

	delete(url, reason) {
		return new Promise((resolve, reject) => {
			var headers = {
				"User-Agent": this.UserAgent,
				"Authorization": this.Authorization,
				"Content-Type": "application/json"
			}

			if (typeof reason !== "undefined") headers["X-Audit-Log-Reason"] = reason;

			fetch(`${API.Base}${url}`, {
				method: "DELETE",
				headers,
			})
				.then(r => {
					return checkResponse(r, "DELETE", url)
				})
				.then(json => {
					if (json instanceof APIError) {
						reject(json)
					} else {
						resolve(json)
					}
				})
		})
	}
}

function checkResponse(r, method, url) {
	if (r.ok) {
		return r.json()
	} else {
		return new APIError(method, r.status, url, r.statusText)
	}
}

module.exports = RESTManager