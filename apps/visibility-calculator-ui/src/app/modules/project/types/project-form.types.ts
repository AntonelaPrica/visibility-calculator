import { AbstractControl } from '@angular/forms';

export interface ProjectForm {
	projectFile: AbstractControl<File | null>;
}

export enum ProjectFormStep {
	UploadFile = 'UploadFile',
}

export class UploadFileStepPayload {
	type: ProjectFormStep.UploadFile;
	file: File;
}

export type ProjectFormStepPayloadUnion = UploadFileStepPayload;
