import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GraphEntity } from './graph.entity';
import { NodeTypeEnum } from '@ro-ubb/api-interfaces';

@Entity()
export class NodeEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column('text', { array: true })
	outgoingEdges: string[];

	@Column('text', { array: true })
	incomingEdges: string[];

	@Column({ type: 'enum', enum: NodeTypeEnum })
	type: NodeTypeEnum;

	@ManyToOne(() => GraphEntity, (graph) => graph.nodes)
	graph?: GraphEntity;

	constructor(values: Partial<NodeEntity>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.outgoingEdges = values.outgoingEdges;
			this.incomingEdges = values.incomingEdges;
			this.type = values.type;
			this.graph = values.graph;
		}
	}
}
