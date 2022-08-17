import { GraphDtoInterface } from './api-project-graph.types';
import { OmitType } from '@nestjs/swagger';

export class GraphWithoutNode extends OmitType(GraphDtoInterface, ['nodes'] as const) {}

export class ProjectDtoInterface {
	id: string;
	description: string;
	name: string;
	graph: GraphWithoutNode;

	constructor(values: Partial<ProjectDtoInterface>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.description = values.description;
			this.graph = values.graph;
		}
	}
}

export class CreateProjectDtoInterface {
	name: string;
	description: string;
	graph: GraphDtoInterface;
}

export class FieldVisibilityDtoInterface {
	id: string;
	fieldName: string;
	visibility: number;

	constructor(values: Partial<FieldVisibilityDtoInterface>) {
		if (values) {
			this.id = values.id;
			this.fieldName = values.fieldName;
			this.visibility = values.visibility;
		}
	}
}

export class EntityVisibilityDtoInterface {
	id: string;
	entityName: string;
	fieldsVisibility: FieldVisibilityDtoInterface[];

	constructor(values: Partial<EntityVisibilityDtoInterface>) {
		if (values) {
			this.id = values.id;
			this.entityName = values.entityName;
			this.fieldsVisibility =
				values.fieldsVisibility?.map((fieldVisibility) => new FieldVisibilityDtoInterface({ ...fieldVisibility })) ||
				[];
		}
	}
}
