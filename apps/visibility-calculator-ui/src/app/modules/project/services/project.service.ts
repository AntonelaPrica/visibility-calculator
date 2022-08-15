import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectStructureDto } from '../types/project-structure.types';
import { ProjectDto } from '../types/project.types';

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

	async getGraphFromClassification(projectClassification): Promise<ProjectStructureDto> {
		return firstValueFrom(this.http.post<ProjectStructureDto>('api/project/graph', projectClassification));
	}
}
