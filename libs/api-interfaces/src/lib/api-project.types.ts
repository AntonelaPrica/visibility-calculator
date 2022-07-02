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

export class FieldVisibilityDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	fieldName: string;

	@ApiProperty()
	visibility: number;

	constructor(values: Partial<FieldVisibilityDto>) {
		if (values) {
			this.id = values.id;
			this.fieldName = values.fieldName;
			this.visibility = values.visibility;
		}
	}
}

export class EntityVisibilityDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	entityName: string;

	@ApiProperty({ type: [FieldVisibilityDto] })
	fieldsVisibility: FieldVisibilityDto[];

	constructor(values: Partial<EntityVisibilityDto>) {
		if (values) {
			this.id = values.id;
			this.entityName = values.entityName;
			this.fieldsVisibility =
				values.fieldsVisibility?.map((fieldVisibility) => new FieldVisibilityDto({ ...fieldVisibility })) || [];
		}
	}
}
