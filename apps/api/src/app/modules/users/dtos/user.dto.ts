import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@ro-ubb/api-interfaces';

export class UserDto implements IUser {
	@ApiProperty({ required: false, description: 'The user unique identifier' })
	id?: string;

	@ApiProperty({ required: true, minLength: 4, description: 'The user email address' })
	email: string;

	@ApiProperty({ required: true, minLength: 2, description: 'The user first name' })
	firstName: string;

	@ApiProperty({ required: true, minLength: 2, description: 'The user last name' })
	lastName: string;

	constructor(values: Partial<UserDto>) {
		if (values) {
			this.id = values.id;
			this.email = values.email;
			this.firstName = values.firstName;
			this.lastName = values.lastName;
		}
	}
}
