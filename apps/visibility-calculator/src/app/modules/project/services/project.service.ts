import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
	ICreateProject,
	IEntityVisibility,
	IGraph,
	IProject,
	IProjectClassification,
	IProjectStructure,
} from '@ro-ubb/api-interfaces';

@Injectable({ providedIn: 'root' })
export class ProjectService {
	constructor(private http: HttpClient) {}

	async parseProject(file: File): Promise<IProjectStructure> {
		const formData = new FormData();
		formData.append('file', file);
		return firstValueFrom(this.http.post<IProjectStructure>('api/project/parse', formData));
	}

	async getProjects(): Promise<IProject[]> {
		return firstValueFrom(this.http.get<IProject[]>('api/project'));
	}

	async getNewGraphFromClassification(projectClassification: IProjectClassification): Promise<IProjectStructure> {
		return firstValueFrom(this.http.post<IProjectStructure>('api/project/graph', projectClassification));
	}

	async saveProject(projectToSave: ICreateProject): Promise<IProject> {
		return firstValueFrom(this.http.post<IProject>('api/project', projectToSave));
	}

	async getProjectVisibility(projectId: string): Promise<IEntityVisibility[]> {
		return firstValueFrom(this.http.get<IEntityVisibility[]>(`api/project/${projectId}/visibility`));
	}

	async getProjectGraph(projectId: string): Promise<IGraph> {
		return firstValueFrom(this.http.get<IGraph>(`api/project/${projectId}/graph`));
	}
}
