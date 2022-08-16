import { OmitType } from '@nestjs/swagger';
import { GraphDto } from './project-graph.types';

export class GraphWithoutNode extends OmitType(GraphDto, ['nodes'] as const) {}

export interface ProjectDto {
	id: string;
	name: string;
	graph: GraphWithoutNode;
}

export interface ProjectWithGraphDto {
	id?: string;
	name: string;
	graph: GraphDto;
}
