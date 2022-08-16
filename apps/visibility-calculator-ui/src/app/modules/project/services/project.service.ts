import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectStructureDto } from '../types/project-structure.types';
import { ProjectDto, ProjectWithGraphDto } from '../types/project.types';
import { GraphDto } from '../types/project-graph.types';
import { ProjectClassificationDto } from '../types/project-classification.types';
import { ProjectEntityVisibilityDto } from '../types/project-visibility.types';

@Injectable({ providedIn: 'root' })
export class ProjectService {
	constructor(private http: HttpClient) {}

	async parseProject(file: File): Promise<ProjectStructureDto> {
		const formData = new FormData();
		formData.append('file', file);
		return firstValueFrom(this.http.post<ProjectStructureDto>('api/project/parse', formData));
	}

	async getProjects(): Promise<ProjectDto[]> {
		return firstValueFrom(this.http.get<ProjectDto[]>('api/project'));
	}

	async getNewGraphFromClassification(projectClassification: ProjectClassificationDto): Promise<ProjectStructureDto> {
		return firstValueFrom(this.http.post<ProjectStructureDto>('api/project/graph', projectClassification));
	}

	async saveProject(projectToSave: ProjectWithGraphDto): Promise<ProjectDto> {
		return firstValueFrom(this.http.post<ProjectDto>('api/project', projectToSave));
	}

	async getProjectVisibility(projectId: string): Promise<ProjectEntityVisibilityDto[]> {
		return firstValueFrom(this.http.get<ProjectEntityVisibilityDto[]>(`api/project/${projectId}/visibility`));
	}

	async getProjectGraph(projectId: string): Promise<GraphDto> {
		return firstValueFrom(this.http.get<GraphDto>(`api/project/${projectId}/graph`));
	}
}
