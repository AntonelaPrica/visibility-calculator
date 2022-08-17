import { ApiProperty, OmitType } from '@nestjs/swagger';
import { GraphDto } from './projects-graph.dto';
import {
	CreateProjectDtoInterface,
	EntityVisibilityDtoInterface,
	FieldVisibilityDtoInterface,
	ProjectDtoInterface,
} from '@ro-ubb/api-interfaces';

export class GraphWithoutNode extends OmitType(GraphDto, ['nodes'] as const) {}

export class ProjectDto extends ProjectDtoInterface {
	@ApiProperty()
	id: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: GraphWithoutNode })
	graph: GraphWithoutNode;

	constructor(values: Partial<ProjectDto>) {
		super(values);
	}
}

export class CreateProjectDto extends CreateProjectDtoInterface {
	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty({ type: GraphDto })
	graph: GraphDto;
}

export class FieldVisibilityDto extends FieldVisibilityDtoInterface {
	@ApiProperty()
	id: string;

	@ApiProperty()
	fieldName: string;

	@ApiProperty()
	visibility: number;

	constructor(values: Partial<FieldVisibilityDto>) {
		super(values);
	}
}

export class EntityVisibilityDto extends EntityVisibilityDtoInterface {
	@ApiProperty()
	id: string;

	@ApiProperty()
	entityName: string;

	@ApiProperty({ type: [FieldVisibilityDto] })
	fieldsVisibility: FieldVisibilityDto[];

	constructor(values: Partial<EntityVisibilityDto>) {
		super(values);
	}
}
