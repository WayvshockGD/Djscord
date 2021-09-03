const Base = require('./Base')
const Constants = require('../util/Constants')

class User extends Base {
	constructor(obj, client) {
		super(obj, client)

		this.username = obj.username
		this.bot = obj.bot || false
		this.discriminator = obj.discriminator
		this.avatar = obj.avatar;
		this.avatarURL = (options = { size: 256, type: "png", dynamic: true }) => {
			var avatar = Constants.CDN.Avatar(this.id, this.avatar, options.type, options.size, options.dynamic)

			if (typeof avatar == "undefined") avatar = Constants.CDN.DefaultAvatar(this.id, this.discriminator, "png")

			return avatar;
		}
		this.defaultAvatarURL = () => {
			return Constants.CDN.DefaultAvatar(this.id, this.discriminator, "png")
		}

		this.tag = `${this.username}#${this.discriminator}`
	}
}

module.exports = User