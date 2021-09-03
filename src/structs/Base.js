class Base {
	constructor(obj, client) {
		this.id = obj.id
		
		Object.defineProperty(this, "client", { value: client, readonly: true })
	}
}

module.exports = Base