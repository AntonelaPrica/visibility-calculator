import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
	MappingStepPayload,
	ProjectFormStep,
	ProjectFormStepPayloadUnion,
	UploadFileStepPayload,
	VerifyStructureStepPayload,
} from '../../types/project-form.types';
import { ProjectService } from '../../services/project.service';
import { cloneDeep as _cloneDeep } from 'lodash';
import { GraphUtils } from '../../utils/graph.utils';
import { Router } from '@angular/router';
import { ProjectRoutesTypes } from '../../types/project-routes.types';
import { AppRoutePaths } from '../../../../core/types/app-routes.types';
import { ICreateProject, IProjectStructure } from '@ro-ubb/api-interfaces';

@Component({
	selector: 'ro-ubb-project-form-container',
	template: ` <mat-stepper [linear]="true" *ngIf="formGroup">
		<mat-step>
			<ng-template matStepLabel>Upload Project</ng-template>
			<ro-ubb-project-upload
				*ngIf="step === 0"
				[form]="formGroup"
				uploadControlName="projectFile"
				titleControlName="projectTitle"
				descriptionControlName="projectDescription"
				(fileUpload)="handleStep($event)"
			></ro-ubb-project-upload>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Verifiy Structure</ng-template>
			<ro-ubb-project-verifiy-structure
				*ngIf="step === 1"
				[form]="formGroup"
				[originalProjectStructure]="this.originalProjectStructure"
				(verifiedStructure)="handleStep($event)"
			></ro-ubb-project-verifiy-structure>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Create Mappings</ng-template>
			<ro-ubb-project-create-mappings
				*ngIf="step === 2"
				[form]="formGroup"
				(dtoMappingsToFields)="handleStep($event)"
			></ro-ubb-project-create-mappings>
		</mat-step>
		<mat-step>
			<ng-template matStepLabel>Review & Save</ng-template>
			<ro-ubb-project-review
				*ngIf="step === 3"
				[form]="formGroup"
				(submitProject)="handleStep($event)"
			></ro-ubb-project-review>
		</mat-step>
	</mat-stepper>`,
	styleUrls: ['project-form-container.component.scss'],
})
export class ProjectFormContainerComponent implements OnInit {
	step = 0;
	formGroup: FormGroup = null;
	availableSteps = ProjectFormStep;
	originalProjectStructure: IProjectStructure;

	constructor(
		private projectService: ProjectService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.formGroup = new FormGroup({
			projectFile: new FormControl(null, [Validators.required]),
			projectTitle: new FormControl(null, [Validators.required]),
			projectDescription: new FormControl(''),
			projectStructure: new FormControl(null),
			originalStructure: new FormControl(null),
		});
	}

	async handleStep(payload: ProjectFormStepPayloadUnion): Promise<void> {
		if (payload.type === ProjectFormStep.UploadFile) {
			this.increaseStep();
			await this.handleUploadFileStep(payload);
		} else if (payload.type === ProjectFormStep.VerifyStructure) {
			this.increaseStep();
			await this.handleVerifyStructureStep(payload);
		} else if (payload.type === ProjectFormStep.Mapping) {
			this.increaseStep();
			await this.handleMappingStep(payload);
		} else if (payload.type === ProjectFormStep.ProjectSubmit) {
			await this.handleSubmit();
		}
	}

	increaseStep(): void {
		this.step++;
		this.changeDetectorRef.detectChanges();
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
		const projectToSave: ICreateProject = {
			name: this.formGroup.get('projectTitle')?.value,
			description: this.formGroup.get('projectDescription')?.value,
			graph: this.formGroup.get('projectStructure').value?.graph,
		};
		const savedProject = await this.projectService.saveProject(projectToSave);
		await this.router.navigate([AppRoutePaths.Projects, ProjectRoutesTypes.View, savedProject?.id], {
			state: { projectDto: savedProject },
		});
	}
}
