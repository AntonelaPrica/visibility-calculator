import { AbstractControl } from '@angular/forms';
import { ProjectClassificationDto } from './project-classification.types';
import { TreeData } from 'mat-tree-select-input';

export interface ProjectForm {
	projectFile: AbstractControl<File | null>;
	projectTitle: AbstractControl<null>;
	projectDescription: AbstractControl<null | string>;
	projectStructure: AbstractControl<null>;
	originalStructure: AbstractControl<null>;
}

export enum ProjectFormStep {
	UploadFile = 'UploadFile',
	VerifyStructure = 'Verify Structure',
	Mapping = 'Mapping',
	ProjectSubmit = 'Submit',
}

export class UploadFileStepPayload {
	type: ProjectFormStep.UploadFile;
	file: File;
}

export class VerifyStructureStepPayload {
	type: ProjectFormStep.VerifyStructure;
	projectClassification: ProjectClassificationDto;
}

export class MappingStepPayload {
	type: ProjectFormStep.Mapping;
	dtoMappings: { [key: string]: TreeData[] };
}

export class ProjectSubmitPayload {
	type: ProjectFormStep.ProjectSubmit;
}

export type ProjectFormStepPayloadUnion =
	| UploadFileStepPayload
	| VerifyStructureStepPayload
	| MappingStepPayload
	| ProjectSubmitPayload;
