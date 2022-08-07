import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	ProjectForm,
	ProjectFormStep,
	ProjectFormStepPayloadUnion,
	UploadFileStepPayload,
} from '../../types/project-form.types';
import { ProjectService } from '../../services/project.service';
import { ProjectStructureDto } from '@ro-ubb/api-interfaces';
import { cloneDeep as _cloneDeep } from 'lodash';

@Component({
	selector: 'ro-ubb-project-form-container',
	template: ` <mat-stepper [linear]="true" *ngIf="formGroup">
		<mat-step>
			<ng-template matStepLabel>Upload Project</ng-template>
			<button mat-button matStepperNext>Next</button>
			<ro-ubb-project-upload
				[form]="formGroup"
				controlName="projectFile"
				(fileUpload)="handleStep($event)"
			></ro-ubb-project-upload>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Verifiy Structure</ng-template>
			<button mat-button matStepperNext>Next</button>
			<ro-ubb-project-verifiy-structure></ro-ubb-project-verifiy-structure>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Create Mappings</ng-template>
			<button mat-button matStepperNext>Next</button>
			<ro-ubb-project-create-mappings></ro-ubb-project-create-mappings>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Review & Save</ng-template>
			<button mat-raised-button color="primary">Submit</button>
			<ro-ubb-project-review></ro-ubb-project-review>
		</mat-step>
	</mat-stepper>`,
	styleUrls: [],
})
export class ProjectFormContainerComponent implements OnInit {
	formGroup: FormGroup = null;
	availableSteps = ProjectFormStep;
	originalProjectStructure: ProjectStructureDto;

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.formGroup = new FormGroup<ProjectForm>({
			projectFile: new FormControl(null, [Validators.required]),
		});
	}

	async handleStep(payload: ProjectFormStepPayloadUnion): Promise<void> {
		if (payload.type === ProjectFormStep.UploadFile) {
			await this.handleUploadFileStep(payload);
		}
	}

	async handleUploadFileStep(payload: UploadFileStepPayload): Promise<void> {
		this.originalProjectStructure = await this.projectService.parseProject(payload.file);
		const clonedProjectStructure = _cloneDeep(this.originalProjectStructure);
		console.log(clonedProjectStructure);
	}
}
