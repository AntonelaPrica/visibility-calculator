import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../../../core/types/app-routes.types';
import { ProjectRoutesTypes } from '../../types/project-routes.types';
import { ProjectDto } from '../../types/project.types';

@Component({
	selector: 'ro-ubb-project-list-container',
	templateUrl: 'project-list-container.component.html',
	styleUrls: ['project-list-container.component.scss'],
})
export class ProjectListContainerComponent implements OnInit {
	projects: ProjectDto[] = [];

	constructor(private projectService: ProjectService, private router: Router) {}

	async ngOnInit() {
		this.projects = await this.projectService.getProjects();
	}

	onCreateProject() {
		this.router.navigate([AppRoutePaths.Projects, ProjectRoutesTypes.Create]);
	}
}
