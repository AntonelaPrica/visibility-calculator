import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphEntity } from './graph.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class ProjectEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@OneToOne(() => GraphEntity)
	@JoinColumn()
	graph: GraphEntity;

	@ManyToOne(() => UserEntity, (user) => user.projects)
	@JoinColumn()
	user: UserEntity;

	constructor(values: Partial<ProjectEntity>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.description = values.description;
			this.graph = values.graph;
			this.user = values.user;
		}
	}
}
