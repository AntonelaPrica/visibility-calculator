import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphEntity } from './graph.entity';

@Entity()
export class NodeEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column('int', { array: true })
	outgoingEdges: number[];

	@Column('int', { array: true })
	incomingEdges: number[];

	@Column()
	type: string;

	@ManyToOne(() => GraphEntity, (graph) => graph.nodes)
	graph: GraphEntity;
}
