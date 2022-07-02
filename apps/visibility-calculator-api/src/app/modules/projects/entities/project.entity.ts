import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	constructor(values: Partial<ProjectEntity>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
		}
	}
}
