const { CDN } = require('../util/Constants')

class Guild {
	constructor(obj, client) {
		this.name = obj.name
		this.id = obj.id
		this.icon = obj.icon
		this.iconURL = (options = { type: "png", size: 256, dynamic: true }) => {
			if (typeof this.icon == "undefined") {
				return null
			}

			return CDN.Icon(this.id, this.icon, options.type, options.size)
		}
	}

	setName(name) {
		
	}
}

module.exports = Guild