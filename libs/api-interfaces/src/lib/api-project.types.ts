import { ApiProperty, OmitType } from '@nestjs/swagger';
import { GraphDto } from './api-project-graph.types';

export class GraphWithoutNode extends OmitType(GraphDto, ['nodes'] as const) {}

export class ProjectDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: GraphWithoutNode })
	graph: GraphWithoutNode;

	constructor(values: Partial<ProjectDto>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.graph = values.graph;
		}
	}
}

export class CreateProjectDto {
	@ApiProperty()
	name: string;

	@ApiProperty({ type: GraphDto })
	graph: GraphDto;
}
