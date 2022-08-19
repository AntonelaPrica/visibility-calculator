import { ApiProperty } from '@nestjs/swagger';
import { IUserAccessToken, IUserLogin, IUserRegister } from '@ro-ubb/api-interfaces';

export class UserAccessTokenDto implements IUserAccessToken {
	@ApiProperty({ description: 'The JWT access token' })
	access_token: string;
}

export class UserLoginDto implements IUserLogin {
	@ApiProperty({ required: true, minLength: 4, description: 'The user email address' })
	username: string; // email

	@ApiProperty({ required: true, minLength: 4, description: 'The user password' })
	password: string;

	constructor(values: Partial<UserLoginDto>) {
		if (values) {
			this.username = values.username;
			this.password = values.password;
		}
	}
}

export class UserRegisterDto implements IUserRegister {
	@ApiProperty({ required: true, minLength: 4, description: 'The user email address' })
	email: string;

	@ApiProperty({ required: true, minLength: 4, description: 'The user password' })
	password?: string;

	@ApiProperty({ required: true, minLength: 2, description: 'The user first name' })
	firstName: string;

	@ApiProperty({ required: true, minLength: 2, description: 'The user last name' })
	lastName: string;

	constructor(values: Partial<UserRegisterDto>) {
		if (values) {
			this.email = values.email;
			this.password = values.password;
			this.firstName = values.firstName;
			this.lastName = values.lastName;
		}
	}
}
