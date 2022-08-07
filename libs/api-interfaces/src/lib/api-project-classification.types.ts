import { ApiProperty } from '@nestjs/swagger';
import { GraphDto } from './api-project-graph.types';

export enum EncapsulationType {
	public = 'public',
	private = 'private',
	protected = 'protected',
	none = 'none',
}

export class ProjectMethodClassificationDto {
	@ApiProperty({ nullable: true })
	id?: string;

	@ApiProperty({ enum: EncapsulationType })
	encapsulationType?: EncapsulationType;

	@ApiProperty()
	returnType: string;

	@ApiProperty()
	methodName: string;

	@ApiProperty()
	input: string;
}

export class ProjectVariableClassificationDto {
	@ApiProperty({ nullable: true })
	id?: string;

	@ApiProperty({ enum: EncapsulationType })
	encapsulationType?: EncapsulationType;

	@ApiProperty()
	variableType: string;

	@ApiProperty()
	variableName: string;
}

export class ProjectDataClassificationDto {
	@ApiProperty({ nullable: true })
	id?: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: ProjectMethodClassificationDto })
	methods?: ProjectMethodClassificationDto[];

	@ApiProperty({ type: ProjectVariableClassificationDto })
	variables?: ProjectVariableClassificationDto[];
}

export class ProjectClassificationDto {
	@ApiProperty({ type: ProjectDataClassificationDto })
	controllers: ProjectDataClassificationDto[] = [];

	@ApiProperty({ type: ProjectDataClassificationDto })
	entities: ProjectDataClassificationDto[] = [];

	@ApiProperty({ type: ProjectDataClassificationDto })
	dtos: ProjectDataClassificationDto[] = [];
}

export class ProjectStructureDto {
	@ApiProperty({ type: ProjectClassificationDto })
	classification: ProjectClassificationDto;
	@ApiProperty({ type: GraphDto })
	graph: GraphDto;

	constructor(values: Partial<ProjectStructureDto>) {
		if (values) {
			this.classification = values.classification;
			this.graph = values.graph;
		}
	}
}
