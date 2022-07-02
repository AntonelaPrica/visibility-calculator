import { Component } from '@angular/core';

@Component({
	selector: 'ro-ubb-project-view-container',
	template: ` <mat-tab-group>
		<mat-tab label="Description">
			<ro-ubb-project-description-tab></ro-ubb-project-description-tab>
		</mat-tab>
		<mat-tab label="Visibility">
			<ro-ubb-project-visibility-tab></ro-ubb-project-visibility-tab>
		</mat-tab>
	</mat-tab-group>`,
	styleUrls: [],
})
export class ProjectViewContainerComponent {}
