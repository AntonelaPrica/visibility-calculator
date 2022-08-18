import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: false })
	password?: string;

	constructor(private values: Partial<UserEntity>) {
		if (values) {
			this.id = values.id;
			this.email = values.email;
			this.password = values.password;
		}
	}
}
