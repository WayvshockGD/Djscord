const { MemberStore } = require('../util/Stores')

class Role extends Base {
	constructor(obj, client) {
		super(obj, client);

		this.name = obj.name;
		this.members = new MemberStore()

		
	}
}