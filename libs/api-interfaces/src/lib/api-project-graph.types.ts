import { NodeTypeEnum } from './node-type.enum';

export class NodeDtoInterface {
	id: string;
	name: string;
	outgoingEdges: string[];
	incomingEdges: string[];

	type: NodeTypeEnum;

	constructor(values: Partial<NodeDtoInterface>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.outgoingEdges = values.outgoingEdges;
			this.incomingEdges = values.incomingEdges;
			this.type = values.type;
		}
	}
}

export class GraphDtoInterface {
	id: string;
	nodes: NodeDtoInterface[];

	constructor(values: Partial<GraphDtoInterface>) {
		if (values) {
			this.id = values.id;
			this.nodes = values.nodes?.map((node) => new NodeDtoInterface({ ...node })) || [];
		}
	}
}
