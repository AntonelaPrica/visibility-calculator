import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: false })
	firstName: string;

	@Column({ nullable: false })
	lastName: string;

	@Column({ nullable: false })
	password?: string;

	@OneToMany(() => ProjectEntity, (photo) => photo.user)
	projects: ProjectEntity[];

	constructor(private values: Partial<UserEntity>) {
		if (values) {
			this.id = values.id;
			this.email = values.email;
			this.firstName = values.firstName;
			this.lastName = values.lastName;
			this.password = values.password;
		}
	}
}
