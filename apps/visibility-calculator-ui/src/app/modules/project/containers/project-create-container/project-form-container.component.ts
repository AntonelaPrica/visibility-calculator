import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	ProjectForm,
	ProjectFormStep,
	ProjectFormStepPayloadUnion,
	UploadFileStepPayload,
} from '../../types/project-form.types';
import { ProjectService } from '../../services/project.service';

import { cloneDeep as _cloneDeep } from 'lodash';

@Component({
	selector: 'ro-ubb-project-form-container',
	template: ` <mat-stepper [linear]="true" *ngIf="formGroup">
		<mat-step>
			<ng-template matStepLabel>Upload Project</ng-template>
			<div class="right-aligned">
				<button mat-raised-button matStepperNext color="primary" [disabled]="!formGroup.get('projectFile').value">
					Next
				</button>
			</div>
			<ro-ubb-project-upload
				[form]="formGroup"
				controlName="projectFile"
				(fileUpload)="handleStep($event)"
			></ro-ubb-project-upload>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Verifiy Structure</ng-template>
			<div class="right-aligned">
				<button mat-raised-button matStepperNext color="primary">Next</button>
			</div>
			<ro-ubb-project-verifiy-structure></ro-ubb-project-verifiy-structure>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Create Mappings</ng-template>
			<div class="right-aligned">
				<button mat-raised-button matStepperNext color="primary">Next</button>
			</div>
			<ro-ubb-project-create-mappings></ro-ubb-project-create-mappings>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Review & Save</ng-template>
			<button mat-raised-button color="primary">Submit</button>
			<ro-ubb-project-review></ro-ubb-project-review>
		</mat-step>
	</mat-stepper>`,
	styleUrls: ['project-form-container.component.scss'],
})
export class ProjectFormContainerComponent implements OnInit {
	formGroup: FormGroup = null;
	availableSteps = ProjectFormStep;
	originalProjectStructure: any;

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
