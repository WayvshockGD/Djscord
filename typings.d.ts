

declare module "djscord" {

	export class Client {
		constructor(options: ClientOptions)

		public token: string;
		public user: ClientUser;
		public users: DataStore;
		public guilds: DataStore;
		public channels: DataStore;

		public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Function): this;
	}

	export class DataStore {

	}

	export class Base {
		public id: string;
	}

	export class User extends Base {
		public username: string;
		public avatar: string;
		public avatarURL(options: AvatarOptions): string;
	}

	export class ClientUser extends User {
		constructor(obj: object, client: Client)

		setStatus(status): ClientUser;
	}

	export class Channel {
		constructor(obj: object, client: Client)

		public id: string;
		public name: string;
		public position: string;
		public parent: string;
		public type: ChannelType;
	}

	export class TextChannel extends Channel {
		constructor(obj: object, client: Client)

		
	}

	export class Message {
		constructor(obj: object, client: Client);

		id: string;
		content: string;
		channel: TextChannel

	}

	export const enum ChannelType {
		GUILD_TEXT = 0,
		DM = 1,
		GUILD_VOICE = 2,
		GROUP_DM = 3,
		GUILD_CATEGORY = 4,
		GUILD_NEWS = 5,
		GUILD_STORE = 6,
		UNKNOWN = 7,
		GUILD_NEWS_THREAD = 10,
		GUILD_PUBLIC_THREAD = 11,
		GUILD_PRIVATE_THREAD = 12,
		GUILD_STAGE_VOICE = 13,
	}

	export interface AvatarOptions {
		type?: string | "png";
		size?: number | 256;
		dynamic?: boolean | false;
	}

	export interface ClientOptions {
		intents: number;
		token: string;
	}

	export interface ClientEvents {
		message: [Message];
	}
}