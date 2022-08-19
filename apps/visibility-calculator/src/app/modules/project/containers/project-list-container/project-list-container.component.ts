import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../../shared/types/app-routes.types';
import { ProjectRoutesTypes } from '../../types/project-routes.types';
import { IProject } from '@ro-ubb/api-interfaces';

@Component({
	selector: 'ro-ubb-project-list-container',
	templateUrl: 'project-list-container.component.html',
	styleUrls: ['project-list-container.component.scss'],
})
export class ProjectListContainerComponent implements OnInit {
	projects: IProject[] = [];

	constructor(private projectService: ProjectService, private router: Router) {}

	async ngOnInit() {
		this.projects = await this.projectService.getProjects();
	}

	onCreateProject(): void {
		this.router.navigate([AppRoutePaths.Projects, ProjectRoutesTypes.Create]);
	}

	openProject(projectDto: IProject): void {
		this.router.navigate([AppRoutePaths.Projects, ProjectRoutesTypes.View, projectDto?.id], {
			state: { projectDto: projectDto },
		});
	}
}
