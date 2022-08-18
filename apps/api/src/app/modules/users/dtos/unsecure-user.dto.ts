export class UnsecureUserDto {
	id?: string;
	email: string;
	password: string;

	constructor(values: Partial<UnsecureUserDto>) {
		if (values) {
			this.id = values.id;
			this.email = values.email;
			this.password = values.password;
		}
	}
}
