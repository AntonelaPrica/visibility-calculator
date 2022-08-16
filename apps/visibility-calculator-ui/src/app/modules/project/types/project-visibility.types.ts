export interface FieldEntityVisibilityDto {
	id: string;
	fieldName: string;
	visibility: number;
}

export interface ProjectEntityVisibilityDto {
	id: string;
	entityName: string;
	fieldsVisibility: FieldEntityVisibilityDto[];
}
