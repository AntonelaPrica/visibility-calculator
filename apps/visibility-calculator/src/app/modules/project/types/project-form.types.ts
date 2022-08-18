import { TreeData } from 'mat-tree-select-input';
import { IProjectClassification } from '@ro-ubb/api-interfaces';

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
	projectClassification: IProjectClassification;
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
