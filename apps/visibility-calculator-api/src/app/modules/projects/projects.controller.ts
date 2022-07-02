import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto, GraphDto, ProjectDto, ProjectStructureDto } from '@ro-ubb/api-interfaces';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectFeatureName } from './projects.config';

@ApiTags(ProjectFeatureName)
@Controller(ProjectFeatureName)
export class ProjectsController {
	constructor(private readonly projectService: ProjectsService) {}

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
		return this.projectService.getProjectClassification(file);
	}

	@Get('graph/:id')
	@ApiOkResponse({
		type: GraphDto,
	})
	async getGraphById(@Param('id') id: string): Promise<GraphDto> {
		return this.projectService.getGraphById(id);
	}

	@Get(':id')
	@ApiOkResponse({
		type: ProjectDto,
	})
	async getById(@Param('id') id: string): Promise<ProjectDto> {
		return this.projectService.getById(id);
	}

	@Get()
	@ApiOkResponse({
		type: [ProjectDto],
	})
	async getAll(): Promise<ProjectDto[]> {
		return this.projectService.getAll();
	}

	@Post()
	@ApiBody({
		type: CreateProjectDto,
	})
	@ApiOkResponse({
		type: ProjectDto,
	})
	async saveProject(@Body() projectDto: CreateProjectDto): Promise<ProjectDto> {
		return this.projectService.saveProject(projectDto);
	}
}
