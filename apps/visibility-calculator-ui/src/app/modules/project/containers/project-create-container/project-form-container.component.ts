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
import { GraphUtils } from '../../utils/graph.utils';
import { ProjectWithGraphDto } from '../../types/project.types';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../../../core/types/app-routes.types';
import { ProjectRoutesTypes } from '../../types/project-routes.types';

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
			<ro-ubb-project-review [form]="formGroup" (submitProject)="handleStep($event)"></ro-ubb-project-review>
		</mat-step>
	</mat-stepper>`,
	styleUrls: ['project-form-container.component.scss'],
})
export class ProjectFormContainerComponent implements OnInit {
	formGroup: FormGroup = null;
	availableSteps = ProjectFormStep;
	originalProjectStructure: ProjectStructureDto;

	constructor(private projectService: ProjectService, private router: Router) {}

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
		} else if (payload.type === ProjectFormStep.ProjectSubmit) {
			await this.handleSubmit();
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
		const newStructure = await this.projectService.getNewGraphFromClassification(payload.projectClassification);

		this.formGroup.patchValue({
			projectStructure: {
				graph: newStructure.graph,
				classification: newStructure.classification,
			},
		});
	}

	async handleMappingStep(payload: MappingStepPayload): Promise<void> {
		const graphWithMappings = GraphUtils.addDtoMappingsToGraph(
			payload,
			this.formGroup.get('projectStructure').value?.graph
		);
		this.formGroup.patchValue({
			projectStructure: {
				graph: graphWithMappings,
				classification: this.formGroup.get('projectStructure').value?.classification,
			},
		});
	}

	async handleSubmit() {
		const projectToSave: ProjectWithGraphDto = {
			name: 'test1',
			graph: this.formGroup.get('projectStructure').value?.graph,
		};
		const savedProject = await this.projectService.saveProject(projectToSave);

		// this.router.navigate([AppRoutePaths.Projects, ProjectRoutesTypes.View, savedProject?.id]);
	}
}
