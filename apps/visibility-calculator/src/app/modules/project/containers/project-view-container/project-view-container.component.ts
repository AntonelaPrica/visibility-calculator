import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { IEntityVisibility, IGraph, IProject } from '@ro-ubb/api-interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-project-view-container',
	template: `
		<div *ngIf="project" class="small-margin">
			<mat-card>
				<mat-card-title>{{ project.name }}</mat-card-title>
				<mat-card-content>{{ project.description }}</mat-card-content>
			</mat-card>

			<mat-tab-group>
				<mat-tab label="Entity Field Visibility">
					<ro-ubb-project-visibility-tab [projectVisibility]="projectVisibility"></ro-ubb-project-visibility-tab>
				</mat-tab>
				<mat-tab label="Graph">
					<ng-template matTabContent>
						<ro-ubb-project-graph-tab [projectGraph]="projectGraph"></ro-ubb-project-graph-tab>
					</ng-template>
				</mat-tab>
				<mat-tab label="Statistics">
					<ng-template matTabContent>
						<ro-ubb-project-statistics-tab [projectVisibility]="projectVisibility"></ro-ubb-project-statistics-tab>
					</ng-template>
				</mat-tab>
			</mat-tab-group>
		</div>
	`,
	styleUrls: ['project-view-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectViewContainerComponent implements OnInit {
	projectId: string;
	project: IProject = null;
	projectGraph: IGraph;
	projectVisibility: IEntityVisibility[] = [];

	constructor(
		private projectService: ProjectService,
		private activateRoute: ActivatedRoute,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	async ngOnInit(): Promise<void> {
		this.activateRoute.params.pipe(untilDestroyed(this)).subscribe(async (params) => {
			this.projectId = params['id'];
			this.project = await this.projectService.getProjectById(this.projectId);
			this.projectVisibility = await this.projectService.getProjectVisibility(this.projectId);
			this.projectGraph = await this.projectService.getProjectGraph(this.projectId);
			this.changeDetectorRef.detectChanges();
		});
	}
}
