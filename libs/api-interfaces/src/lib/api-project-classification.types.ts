import { ApiProperty } from '@nestjs/swagger';

export enum EncapsulationType {
	public = 'public',
	private = 'private',
	protected = 'protected',
}

export class ProjectMethodClassificationDto {
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
	@ApiProperty({ enum: EncapsulationType })
	encapsulationType?: EncapsulationType;

	@ApiProperty()
	variableType: string;

	@ApiProperty()
	variableName: string;
}

export class ProjectDataClassificationDto {
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
