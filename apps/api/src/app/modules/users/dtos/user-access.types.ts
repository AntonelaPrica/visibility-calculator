import { ApiProperty } from '@nestjs/swagger';

export class UserAccessTokenDto {
	@ApiProperty({ description: 'The JWT access token' })
	access_token: string;
}

export class UserLoginDto {
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

export class UserRegisterDto {
	@ApiProperty({ required: true, minLength: 4, description: 'The user email address' })
	email: string;

	@ApiProperty({ required: true, minLength: 4, description: 'The user password' })
	password?: string;

	constructor(values: Partial<UserRegisterDto>) {
		if (values) {
			this.email = values.email;
			this.password = values.password;
		}
	}
}
