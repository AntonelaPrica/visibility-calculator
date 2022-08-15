import { AbstractControl } from '@angular/forms';
import { ProjectClassificationDto } from './project-classification.types';
import { GraphDto } from './project-graph.types';
import { TreeData } from 'mat-tree-select-input';

export interface ProjectForm {
	projectFile: AbstractControl<File | null>;
	projectStructure: AbstractControl<null>;
	originalStructure: AbstractControl<null>;
}

export enum ProjectFormStep {
	UploadFile = 'UploadFile',
	VerifyStructure = 'Verify Structure',
	Mapping = 'Mapping',
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
	dtoMapping: { [key: string]: TreeData[] };
}

export type ProjectFormStepPayloadUnion = UploadFileStepPayload | VerifyStructureStepPayload | MappingStepPayload;
