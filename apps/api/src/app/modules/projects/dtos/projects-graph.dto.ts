import { ApiProperty } from '@nestjs/swagger';
import { IGraph, INode, NodeTypeEnum } from '@ro-ubb/api-interfaces';

export class NodeDto implements INode {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	outgoingEdges: string[];

	@ApiProperty()
	incomingEdges: string[];

	@ApiProperty({ enum: NodeTypeEnum })
	type: NodeTypeEnum;

	constructor(values: Partial<NodeDto>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.outgoingEdges = values.outgoingEdges;
			this.incomingEdges = values.incomingEdges;
			this.type = values.type;
		}
	}
}

export class GraphDto implements IGraph {
	@ApiProperty()
	id: string;

	@ApiProperty({ type: [NodeDto] })
	nodes: NodeDto[];

	constructor(values: Partial<GraphDto>) {
		if (values) {
			this.id = values.id;
			this.nodes = values.nodes?.map((node) => new NodeDto({ ...node })) || [];
		}
	}
}
