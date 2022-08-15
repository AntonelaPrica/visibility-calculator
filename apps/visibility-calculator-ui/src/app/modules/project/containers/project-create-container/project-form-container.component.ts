import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	MappingStepPayload,
	ProjectForm,
	ProjectFormStep,
	ProjectFormStepPayloadUnion,
	UploadFileStepPayload,
	VerifyStructureStepPayload,
} from '../../types/project-form.types';
import { ProjectService } from '../../services/project.service';
import { cloneDeep as _cloneDeep } from 'lodash';
import { ProjectStructureDto } from '../../types/project-structure.types';

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
			<ro-ubb-project-verifiy-structure
				[form]="formGroup"
				[originalProjectStructure]="this.originalProjectStructure"
				(verifiedStructure)="handleStep($event)"
			></ro-ubb-project-verifiy-structure>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Create Mappings</ng-template>
			<ro-ubb-project-create-mappings
				[form]="formGroup"
				(dtoMappingsToFields)="handleStep($event)"
			></ro-ubb-project-create-mappings>
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
	originalProjectStructure: ProjectStructureDto;

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.formGroup = new FormGroup<ProjectForm>({
			projectFile: new FormControl(null, [Validators.required]),
			projectStructure: new FormControl(null),
			originalStructure: new FormControl(null),
		});
	}

	async handleStep(payload: ProjectFormStepPayloadUnion): Promise<void> {
		if (payload.type === ProjectFormStep.UploadFile) {
			await this.handleUploadFileStep(payload);
		} else if (payload.type === ProjectFormStep.VerifyStructure) {
			await this.handleVerifyStructureStep(payload);
		} else if (payload.type === ProjectFormStep.Mapping) {
			await this.handleMappingStep(payload);
		}
	}

	async handleUploadFileStep(payload: UploadFileStepPayload): Promise<void> {
		this.originalProjectStructure = await this.projectService.parseProject(payload.file);
		const clonedProjectStructure = _cloneDeep(this.originalProjectStructure);

		this.formGroup.patchValue({
			originalStructure: this.originalProjectStructure,
			projectStructure: clonedProjectStructure,
		});
	}

	async handleVerifyStructureStep(payload: VerifyStructureStepPayload): Promise<void> {
		const updatedGraph = await this.projectService.getGraphFromClassification(payload.projectClassification);
		this.formGroup.patchValue({
			projectStructure: {
				graph: updatedGraph,
				classification: payload.projectClassification,
			},
		});
	}

	async handleMappingStep(payload: MappingStepPayload): Promise<void> {
		console.log(payload.dtoMapping);
	}
}
