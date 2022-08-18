import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GraphDto } from '../../../types/project-graph.types';
import { ProjectFormStep, ProjectSubmitPayload } from '../../../types/project-form.types';

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

	graph: GraphDto = null;

	ngOnInit(): void {
		this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((updatedForm) => {
			this.graph = updatedForm?.projectStructure?.graph;
		});
	}

	onSubmit() {
		this.submitProject.emit({ type: ProjectFormStep.ProjectSubmit });
	}
}
