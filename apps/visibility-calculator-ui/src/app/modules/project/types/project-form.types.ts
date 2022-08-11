import { AbstractControl } from '@angular/forms';

export interface ProjectForm {
	projectFile: AbstractControl<File | null>;
	projectStructure: AbstractControl<null>;
	originalStructure: AbstractControl<null>;
}

export enum ProjectFormStep {
	UploadFile = 'UploadFile',
	VerifyStructure = 'Verify Structure',
}

export class UploadFileStepPayload {
	type: ProjectFormStep.UploadFile;
	file: File;
}

export class VerifyStructureStepPayload {
	type: ProjectFormStep.VerifyStructure;
	projectClassification: any;
}

export type ProjectFormStepPayloadUnion = UploadFileStepPayload | VerifyStructureStepPayload;
