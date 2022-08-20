import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, firstValueFrom } from 'rxjs';
import {
	ICreateProject,
	IEntityVisibility,
	IGraph,
	IProject,
	IProjectClassification,
	IProjectStructure,
} from '@ro-ubb/api-interfaces';
import { LoadingManagerService } from '../../shared/loading-manager.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
	constructor(private http: HttpClient, private loadingManager: LoadingManagerService) {}

	async parseProject(file: File): Promise<IProjectStructure> {
		const formData = new FormData();
		formData.append('file', file);
		return firstValueFrom(this.http.post<IProjectStructure>('api/project/parse', formData));
	}

	async getProjects(): Promise<IProject[]> {
		this.loadingManager.isLoading = true;
		return firstValueFrom(
			this.http.get<IProject[]>('api/project').pipe(finalize(() => (this.loadingManager.isLoading = false)))
		);
	}

	async getNewGraphFromClassification(projectClassification: IProjectClassification): Promise<IProjectStructure> {
		this.loadingManager.isLoading = true;
		return firstValueFrom(
			this.http
				.post<IProjectStructure>('api/project/graph', projectClassification)
				.pipe(finalize(() => (this.loadingManager.isLoading = false)))
		);
	}

	async saveProject(projectToSave: ICreateProject): Promise<IProject> {
		this.loadingManager.isLoading = true;
		return firstValueFrom(
			this.http
				.post<IProject>('api/project', projectToSave)
				.pipe(finalize(() => (this.loadingManager.isLoading = false)))
		);
	}

	async getProjectVisibility(projectId: string): Promise<IEntityVisibility[]> {
		this.loadingManager.isLoading = true;
		return firstValueFrom(
			this.http
				.get<IEntityVisibility[]>(`api/project/${projectId}/visibility`)
				.pipe(finalize(() => (this.loadingManager.isLoading = false)))
		);
	}

	async getProjectGraph(projectId: string): Promise<IGraph> {
		this.loadingManager.isLoading = true;
		return firstValueFrom(
			this.http
				.get<IGraph>(`api/project/${projectId}/graph`)
				.pipe(finalize(() => (this.loadingManager.isLoading = false)))
		);
	}
	async getProjectById(projectId: string): Promise<IProject> {
		this.loadingManager.isLoading = true;
		return firstValueFrom(
			this.http.get<IProject>(`api/project/${projectId}`).pipe(finalize(() => (this.loadingManager.isLoading = false)))
		);
	}

	async removeProject(projectId: string): Promise<void> {
		this.loadingManager.isLoading = true;
		return firstValueFrom(
			this.http.delete<void>(`api/project/${projectId}`).pipe(finalize(() => (this.loadingManager.isLoading = false)))
		);
	}
}
