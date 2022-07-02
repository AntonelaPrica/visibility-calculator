import { Component } from '@angular/core';

@Component({
	selector: 'ro-ubb-project-form-container',
	template: `<mat-vertical-stepper [linear]="true">
		<mat-step>
			<ng-template matStepLabel>Upload Project</ng-template>
			<button mat-button matStepperNext>Next</button>
			<ro-ubb-project-upload></ro-ubb-project-upload>
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
	</mat-vertical-stepper>`,
	styleUrls: [],
})
export class ProjectFormContainerComponent {}
