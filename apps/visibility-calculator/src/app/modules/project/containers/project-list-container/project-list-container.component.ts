import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../../shared/types/app-routes.types';
import { ProjectRoutesTypes } from '../../types/project-routes.types';
import { IProject } from '@ro-ubb/api-interfaces';
import { MatDialog } from '@angular/material/dialog';
import {
	ConfirmationDialogComponent,
	ConfirmationDialogData,
} from '../../../shared/components/dialogs/confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'ro-ubb-project-list-container',
	templateUrl: 'project-list-container.component.html',
	styleUrls: ['project-list-container.component.scss'],
})
export class ProjectListContainerComponent implements OnInit {
	projects: IProject[] = [];

	constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog) {}

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

	async onRemoveProject(projectDto: IProject): Promise<void> {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '412px',
			data: {
				title: `Delete ${projectDto.name}`,
				content: `Are you sure you want to remove this project and all the data associated with it?`,
			} as ConfirmationDialogData,
		});
		const result = await firstValueFrom(dialogRef.afterClosed());
		if (!result) {
			return;
		}

		await this.projectService.removeProject(projectDto.id);
		this.projects = this.projects.filter((p) => p.id !== projectDto.id);
	}
}
