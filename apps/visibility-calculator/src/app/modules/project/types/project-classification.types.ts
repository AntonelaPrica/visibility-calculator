export enum EncapsulationType {
	public = 'public',
	private = 'private',
	protected = 'protected',
	none = 'none',
}

export interface ProjectMethodClassificationDto {
	id?: string;
	encapsulationType?: EncapsulationType;
	returnType: string;
	methodName: string;
	input: string;
}

export interface ProjectVariableClassificationDto {
	id?: string;
	encapsulationType?: EncapsulationType;
	variableType: string;
	variableName: string;
}

export interface ProjectDataClassificationDto {
	id?: string;
	name: string;
	methods?: ProjectMethodClassificationDto[];
	variables?: ProjectVariableClassificationDto[];
}

export interface ProjectClassificationDto {
	controllers: ProjectDataClassificationDto[];
	entities: ProjectDataClassificationDto[];
	dtos: ProjectDataClassificationDto[];
}
