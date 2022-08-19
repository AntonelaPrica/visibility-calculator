import { IUser } from '@ro-ubb/api-interfaces';

export class UnsecureUserDto implements IUser {
	id?: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;

	constructor(values: Partial<UnsecureUserDto>) {
		if (values) {
			this.id = values.id;
			this.email = values.email;
			this.password = values.password;
			this.firstName = values.firstName;
			this.lastName = values.lastName;
		}
	}
}
