import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphEntity } from './graph.entity';

@Entity()
export class ProjectEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToOne(() => GraphEntity)
	@JoinColumn()
	graph: GraphEntity;

	constructor(values: Partial<ProjectEntity>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.graph = values.graph;
		}
	}
}
