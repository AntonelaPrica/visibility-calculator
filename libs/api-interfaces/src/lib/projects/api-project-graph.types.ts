import { NodeTypeEnum } from './node-type.enum';

export interface INode {
	id: string;
	name: string;
	outgoingEdges: string[];
	incomingEdges: string[];

	type: NodeTypeEnum;
}

export interface IGraph {
	id: string;
	nodes: INode[];
}

export interface IGraphReference {
	id: string;
}
