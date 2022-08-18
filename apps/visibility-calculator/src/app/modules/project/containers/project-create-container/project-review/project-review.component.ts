import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProjectFormStep, ProjectSubmitPayload } from '../../../types/project-form.types';
import { IGraph } from '@ro-ubb/api-interfaces';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-project-review',
	template: `
		<div class="right-aligned p-1">
			<button mat-raised-button color="primary" (click)="onSubmit()">Submit</button>
		</div>
		<div *ngIf="graph" class="full-page-height">
			<ro-ubb-graph-container [graph]="graph"></ro-ubb-graph-container>
		</div>
	`,
	styleUrls: ['project-review.component.scss'],
})
export class ProjectReviewComponent implements OnInit {
	@Input() form: FormGroup;
	@Output() submitProject: EventEmitter<ProjectSubmitPayload> = new EventEmitter<ProjectSubmitPayload>();

	graph: IGraph | null = null;

	ngOnInit(): void {
		this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((updatedForm) => {
			this.graph = updatedForm?.projectStructure?.graph;
		});
	}

	onSubmit() {
		this.submitProject.emit({ type: ProjectFormStep.ProjectSubmit });
	}
}
