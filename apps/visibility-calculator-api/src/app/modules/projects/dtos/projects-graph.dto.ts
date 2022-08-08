import { ApiProperty } from '@nestjs/swagger';
import { GraphDtoInterface, NodeDtoInterface, NodeTypeEnum } from '@ro-ubb/api-interfaces';

export class NodeDto extends NodeDtoInterface {
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
		super(values);
	}
}

export class GraphDto extends GraphDtoInterface {
	@ApiProperty()
	id: string;

	@ApiProperty({ type: [NodeDto] })
	nodes: NodeDto[];

	constructor(values: Partial<GraphDto>) {
		super(values);
	}
}
