import { ApiProperty } from '@nestjs/swagger';
import { GraphDto } from './projects-graph.dto';
import {
	EncapsulationType,
	ProjectClassificationDtoInterface,
	ProjectDataClassificationDtoInterface,
	ProjectMethodClassificationDtoInterface,
	ProjectStructureDtoInterface,
	ProjectVariableClassificationDtoInterface,
} from '@ro-ubb/api-interfaces';

export class ProjectMethodClassificationDto extends ProjectMethodClassificationDtoInterface {
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

export class ProjectVariableClassificationDto extends ProjectVariableClassificationDtoInterface {
	@ApiProperty({ nullable: true })
	id?: string;

	@ApiProperty({ enum: EncapsulationType })
	encapsulationType?: EncapsulationType;

	@ApiProperty()
	variableType: string;

	@ApiProperty()
	variableName: string;
}

export class ProjectDataClassificationDto extends ProjectDataClassificationDtoInterface {
	@ApiProperty({ nullable: true })
	id?: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ type: ProjectMethodClassificationDto })
	methods?: ProjectMethodClassificationDto[];

	@ApiProperty({ type: ProjectVariableClassificationDto })
	variables?: ProjectVariableClassificationDto[];
}

export class ProjectClassificationDto extends ProjectClassificationDtoInterface {
	@ApiProperty({ type: ProjectDataClassificationDto })
	controllers: ProjectDataClassificationDto[] = [];

	@ApiProperty({ type: ProjectDataClassificationDto })
	entities: ProjectDataClassificationDto[] = [];

	@ApiProperty({ type: ProjectDataClassificationDto })
	dtos: ProjectDataClassificationDto[] = [];
}

export class ProjectStructureDto extends ProjectStructureDtoInterface {
	@ApiProperty({ type: ProjectClassificationDto })
	classification: ProjectClassificationDto;
	@ApiProperty({ type: GraphDto })
	graph: GraphDto;

	constructor(values: Partial<ProjectStructureDto>) {
		super(values);
	}
}
