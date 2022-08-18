import { ApiProperty, OmitType } from '@nestjs/swagger';
import { GraphDto } from './projects-graph.dto';
import { ICreateProject, IEntityVisibility, IFieldVisibility, IGraphReference, IProject } from '@ro-ubb/api-interfaces';

export class GraphReference extends OmitType(GraphDto, ['nodes'] as const) implements IGraphReference {}

export class ProjectDto implements IProject {
	@ApiProperty()
	id: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: GraphReference })
	graph: GraphReference;

	constructor(values: Partial<ProjectDto>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
			this.description = values.description;
			this.graph = values.graph;
		}
	}
}

export class CreateProjectDto implements ICreateProject {
	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty({ type: GraphDto })
	graph: GraphDto;
}

export class FieldVisibilityDto implements IFieldVisibility {
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

export class EntityVisibilityDto implements IEntityVisibility {
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
