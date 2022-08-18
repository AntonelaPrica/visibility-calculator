import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty({ required: false, description: 'The user unique identifier' })
	id?: string;

	@ApiProperty({ required: true, minLength: 4, description: 'The user email address' })
	email: string;

	constructor(values: Partial<UserDto>) {
		if (values) {
			this.id = values.id;
			this.email = values.email;
		}
	}
}
