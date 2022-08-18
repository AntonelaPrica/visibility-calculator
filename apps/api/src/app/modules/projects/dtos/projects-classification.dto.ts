import { ApiProperty } from '@nestjs/swagger';
import { GraphDto } from './projects-graph.dto';
import {
	EncapsulationType,
	IProjectClassification,
	IProjectDataClassification,
	IProjectMethodClassification,
	IProjectStructure,
	IProjectVariableClassification,
} from '@ro-ubb/api-interfaces';

export class ProjectMethodClassificationDto implements IProjectMethodClassification {
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

export class ProjectVariableClassificationDto implements IProjectVariableClassification {
	@ApiProperty({ nullable: true })
	id?: string;

	@ApiProperty({ enum: EncapsulationType })
	encapsulationType?: EncapsulationType;

	@ApiProperty()
	variableType: string;

	@ApiProperty()
	variableName: string;
}

export class ProjectDataClassificationDto implements IProjectDataClassification {
	@ApiProperty({ nullable: true })
	id?: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: ProjectMethodClassificationDto })
	methods?: ProjectMethodClassificationDto[];

	@ApiProperty({ type: ProjectVariableClassificationDto })
	variables?: ProjectVariableClassificationDto[];
}

export class ProjectClassificationDto implements IProjectClassification {
	@ApiProperty({ type: ProjectDataClassificationDto })
	controllers: ProjectDataClassificationDto[] = [];

	@ApiProperty({ type: ProjectDataClassificationDto })
	entities: ProjectDataClassificationDto[] = [];

	@ApiProperty({ type: ProjectDataClassificationDto })
	dtos: ProjectDataClassificationDto[] = [];
}

export class ProjectStructureDto implements IProjectStructure {
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
