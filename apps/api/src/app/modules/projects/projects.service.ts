import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as AdmZip from 'adm-zip';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectsClassifierUtils } from './utils/projects-classifier.utils';
import { ProjectsMappers } from './projects.mappers';
import { ProjectGraphUtils } from './utils/project-graph.utils';
import { GraphEntity } from './entities/graph.entity';
import { NodeEntity } from './entities/node.entity';
import { CreateProjectDto, ProjectDto } from './dtos/projects.dto';
import { GraphDto } from './dtos/projects-graph.dto';
import { ProjectClassificationDto, ProjectStructureDto } from './dtos/projects-classification.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectEntityRepository: Repository<ProjectEntity>,
		@InjectRepository(GraphEntity)
		private graphEntityRepository: Repository<GraphEntity>,
		@InjectRepository(NodeEntity)
		private nodeEntityRepository: Repository<NodeEntity>,
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>
	) {}

	async getById(id: string, currentUserId: string): Promise<ProjectDto> {
		let foundProject: ProjectEntity = null;
		try {
			foundProject = await this.projectEntityRepository.findOne({
				where: { id, user: { id: currentUserId } },
				relations: ['graph'],
			});
		} catch (error) {
			Logger.error(`ProjectsService.getById ${error}`);
			throw new NotFoundException(`The project ${id} could not be found.`);
		}
		return ProjectsMappers.mapToProjectDto(foundProject);
	}

	async removeById(id: string, currentUserId: string): Promise<void> {
		try {
			const foundProject = await this.projectEntityRepository.findOne({
				where: { id, user: { id: currentUserId } },
				relations: ['graph'],
			});
			await this.projectEntityRepository.remove(foundProject);
		} catch (error) {
			Logger.error(`ProjectsService.removeById ${error}`);
			throw new BadRequestException(`The project ${id} could not be removed.`);
		}
	}

	async getGraphByProjectId(projectId: string, currentUserId: string): Promise<GraphDto> {
		try {
			const project = await this.getById(projectId, currentUserId);
			const graph = await this.graphEntityRepository.findOne({ where: { id: project.graph.id }, relations: ['nodes'] });
			return ProjectsMappers.mapToGraphDto(graph);
		} catch (error) {
			Logger.error(`ProjectsService.saveProject ${error}`);
			throw new NotFoundException(`The graph of project ${projectId} could not be found.`);
		}
	}

	async getAll(currentUserId: string): Promise<ProjectDto[]> {
		const foundProjects = await this.projectEntityRepository.find({
			relations: ['graph'],
			where: { user: { id: currentUserId } },
		});
		return foundProjects.map((project) => ProjectsMappers.mapToProjectDto(project));
	}

	async saveProject(newProject: CreateProjectDto, currentUserId: string): Promise<ProjectDto> {
		try {
			const currentUserEntity = await this.usersRepository.findOneBy({ id: currentUserId });
			const initialGraph = new GraphEntity({ id: newProject.graph.id });
			const savedGraph = await this.graphEntityRepository.save(initialGraph);

			const initialNodes = newProject.graph.nodes.map((node) => ProjectsMappers.mapToNodeEntity(node, savedGraph));
			await this.nodeEntityRepository.save(initialNodes);

			const entity = new ProjectEntity({
				name: newProject.name,
				description: newProject.description,
				graph: savedGraph,
				user: currentUserEntity,
			});
			const savedProject: ProjectEntity = await this.projectEntityRepository.save(entity);
			return ProjectsMappers.mapToProjectDto(savedProject);
		} catch (error) {
			Logger.error(`ProjectsService.saveProject ${error}`);
			throw new BadRequestException('The project could not be saved due to malformed data.');
		}
	}

	async getProjectStructure(file): Promise<ProjectStructureDto> {
		const projectClassification = await ProjectsService.parseProjectClassification(file);
		const { graph, classification } = ProjectGraphUtils.parseClassificationToGraph(projectClassification);
		return new ProjectStructureDto({ graph, classification });
	}

	async getProjectClassification(projectClassificationDto): Promise<ProjectStructureDto> {
		return ProjectGraphUtils.parseClassificationToGraph(projectClassificationDto);
	}

	private static async parseProjectClassification(file): Promise<ProjectClassificationDto> {
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
		} catch (error) {
			Logger.error(`ProjectsService.parseProjectClassification ${error}`);
			throw new BadRequestException('The data could not be parsed.');
		}
		return projectClassification;
	}
}
