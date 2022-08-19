export interface IUserAccessToken {
	access_token: string;
}

export class IUserLogin {
	username: string; // email
	password: string;
}

export class IUserRegister {
	email: string;
	password?: string;
	firstName: string;
	lastName: string;
}
