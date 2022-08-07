import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectDto, ProjectStructureDto } from '@ro-ubb/api-interfaces';

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
}
