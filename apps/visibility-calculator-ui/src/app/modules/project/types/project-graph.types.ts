import { NodeTypeEnum } from '@ro-ubb/api-interfaces';

export class NodeDto {
	id: string;
	name: string;
	outgoingEdges: string[];
	incomingEdges: string[];

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

export class GraphDto {
	id: string;
	nodes: NodeDto[];

	constructor(values: Partial<GraphDto>) {
		if (values) {
			this.id = values.id;
			this.nodes = values.nodes?.map((node) => new NodeDto({ ...node })) || [];
		}
	}
}
