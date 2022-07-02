import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as AdmZip from 'adm-zip';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectsClassifierUtils } from './projects-classifier.utils';
import { CreateProjectDto, ProjectClassificationDto, ProjectDto } from '@ro-ubb/api-interfaces';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { ProjectsMappers } from './projects.mappers';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectEntityRepository: Repository<ProjectEntity>
	) {}

	async getById(id: string): Promise<ProjectDto> {
		let foundProject: ProjectEntity = null;
		try {
			foundProject = await this.projectEntityRepository.findOneBy({ id });
		} catch (error) {
			throw new NotFoundException(`The project ${id} could not be found.`);
		}
		return ProjectsMappers.mapToProjectDto(foundProject);
	}

	async getAll(): Promise<ProjectDto[]> {
		const foundProjects = await this.projectEntityRepository.find();
		return foundProjects.map((project) => ProjectsMappers.mapToProjectDto(project));
	}

	async saveProject(newProject: CreateProjectDto): Promise<ProjectDto> {
		const entity = new ProjectEntity({ name: newProject.name });
		const savedProject: ProjectEntity = await this.projectEntityRepository.save(entity);
		if (isNil(savedProject)) {
			throw new BadRequestException('The projects could not be saved.');
		}
		return ProjectsMappers.mapToProjectDto(savedProject);
	}

	async parseProjectClassification(file): Promise<ProjectClassificationDto> {
		const projectClassification = new ProjectClassificationDto();

		try {
			const zip = new AdmZip(file.path);
			const zipEntries = zip.getEntries();
			for (const zipEntry of zipEntries) {
				if (zipEntry.isDirectory) {
					continue;
				}
				const fileData = zipEntry.getData().toString('utf8');
				if (ProjectsClassifierUtils.isController(fileData)) {
					projectClassification.controllers.push({
						name: zipEntry.entryName,
						methods: ProjectsClassifierUtils.getMethods(fileData),
					});
					continue;
				}
				if (ProjectsClassifierUtils.isEntity(fileData)) {
					projectClassification.entities.push({
						name: zipEntry.entryName,
						variables: ProjectsClassifierUtils.getVariables(fileData),
					});
					continue;
				}
				if (ProjectsClassifierUtils.isDto(fileData)) {
					projectClassification.dtos.push({
						name: zipEntry.entryName,
						variables: ProjectsClassifierUtils.getVariables(fileData),
					});
				}
			}
		} catch (e) {
			throw new BadRequestException('The data could not be parsed.');
		}
		return projectClassification;
	}
}
