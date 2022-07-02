import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NodeEntity } from './node.entity';

@Entity()
export class GraphEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(() => NodeEntity, (node) => node.graph)
	nodes: NodeEntity[];
}
