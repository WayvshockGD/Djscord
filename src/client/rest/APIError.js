class DjscordError extends Error {
	constructor(method, code, url, message) {
		message = `${code} ${message}`
		super(message);

		// this.route = route;
		this.message = message;
		this.name = "DjscordError";
		this.method = method;
		this.url = url
		this.code = code
	}
}

module.exports = DjscordError