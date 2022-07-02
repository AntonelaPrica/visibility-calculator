import { ProjectEntity } from './entities/project.entity';
import { ProjectDto } from '@ro-ubb/api-interfaces';

export class ProjectsMappers {
	static mapToProjectDto(projectEntity: ProjectEntity): ProjectDto {
		return new ProjectDto({
			id: projectEntity.id,
			name: projectEntity.name,
		});
	}
}
