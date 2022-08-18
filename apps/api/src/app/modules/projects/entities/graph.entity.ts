import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NodeEntity } from './node.entity';

@Entity()
export class GraphEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(() => NodeEntity, (node) => node.graph, { nullable: true })
	nodes: NodeEntity[];

	constructor(values: Partial<GraphEntity>) {
		if (values) {
			this.id = values.id;
			this.nodes = values.nodes;
		}
	}
}
