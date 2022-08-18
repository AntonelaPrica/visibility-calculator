import { GraphDto } from './project-graph.types';
import { ProjectClassificationDto } from './project-classification.types';

export interface TreeNode {
	id: string;
	name: string;
	children?: TreeNode[];
}

export interface ProjectStructureDto {
	classification: ProjectClassificationDto;
	graph: GraphDto;
}
