import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService {
	constructor(private http: HttpClient) {}

	async parseProject(file: File): Promise<any> {
		const formData = new FormData();
		formData.append('file', file);
		return firstValueFrom(this.http.post<any>('api/project/parse', formData));
	}

	async getProjects(): Promise<any[]> {
		return firstValueFrom(this.http.get<any[]>('api/project'));
	}

	async getGraphFromClassification(projectClassification): Promise<any> {
		return firstValueFrom(this.http.post<any>('api/project/graph', projectClassification));
	}
}
