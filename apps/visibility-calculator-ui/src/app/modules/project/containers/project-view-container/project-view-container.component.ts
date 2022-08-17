import { Component, Input } from '@angular/core';
import { ProjectDto } from '../../types/project.types';
import { ProjectEntityVisibilityDto } from '../../types/project-visibility.types';
import { GraphDto } from '../../types/project-graph.types';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

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
					<ro-ubb-project-graph-tab [projectGraph]="projectGraph"></ro-ubb-project-graph-tab>
				</mat-tab>
			</mat-tab-group>
		</div>
	`,
	styleUrls: ['project-view-container.component.scss'],
})
export class ProjectViewContainerComponent {
	@Input() project: ProjectDto;

	projectGraph: GraphDto;
	projectVisibility: ProjectEntityVisibilityDto[] = [];

	constructor(private projectService: ProjectService, private router: Router) {
		this.project = this.router.getCurrentNavigation().extras.state['projectDto'];

		this.projectService.getProjectVisibility(this.project.id).then((result) => (this.projectVisibility = result));
		this.projectService.getProjectGraph(this.project.id).then((result) => (this.projectGraph = result));
	}
}
