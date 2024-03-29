import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectFeatureName, ProjectFeatureSwaggerName } from './projects.config';
import { ProjectsVisibilityService } from './projects-visibility.service';
import { ProjectClassificationDto, ProjectStructureDto } from './dtos/projects-classification.dto';
import { GraphDto } from './dtos/projects-graph.dto';
import { CreateProjectDto, EntityVisibilityDto, ProjectDto } from './dtos/projects.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags(ProjectFeatureSwaggerName)
@Controller(ProjectFeatureName)
export class ProjectsController {
	constructor(
		private readonly projectService: ProjectsService,
		private readonly projectsVisibilityService: ProjectsVisibilityService
	) {}

	@UseGuards(JwtAuthGuard)
	@Post('parse')
	@UseInterceptors(FileInterceptor('file', { dest: './upload' }))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiOkResponse({
		description: 'The approximate structure of a project.',
		type: ProjectStructureDto,
	})
	async parseProject(@UploadedFile() file): Promise<ProjectStructureDto> {
		return this.projectService.getProjectStructure(file);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id/graph')
	@ApiOkResponse({
		type: GraphDto,
	})
	async getProjectGraph(@Param('id') projectId: string, @Request() request): Promise<GraphDto> {
		return this.projectService.getGraphByProjectId(projectId, request.user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Post('graph')
	@ApiBody({
		type: ProjectClassificationDto,
	})
	@ApiOkResponse({
		type: GraphDto,
	})
	async getGraphForProjectClassification(
		@Body() projectClassificationDto: ProjectClassificationDto
	): Promise<ProjectStructureDto> {
		return this.projectService.getProjectClassification(projectClassificationDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id/visibility')
	@ApiOkResponse({
		type: [EntityVisibilityDto],
	})
	async getProjectVisibility(@Param('id') projectId: string, @Request() request): Promise<EntityVisibilityDto[]> {
		return this.projectsVisibilityService.calculateVisibility(projectId, request.user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	@ApiOkResponse({
		type: ProjectDto,
	})
	async getById(@Param('id') id: string, @Request() request): Promise<ProjectDto> {
		return this.projectService.getById(id, request.user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	@ApiOkResponse({
		type: [ProjectDto],
	})
	async getAll(@Request() request): Promise<ProjectDto[]> {
		return this.projectService.getAll(request.user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	@ApiBody({
		type: CreateProjectDto,
	})
	@ApiOkResponse({
		type: ProjectDto,
	})
	async saveProject(@Body() projectDto: CreateProjectDto, @Request() request): Promise<ProjectDto> {
		return this.projectService.saveProject(projectDto, request.user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	@ApiOkResponse({})
	async removeById(@Param('id') id: string, @Request() request): Promise<void> {
		return this.projectService.removeById(id, request.user.userId);
	}
}
