import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto, ProjectClassificationDto, ProjectDto } from '@ro-ubb/api-interfaces';
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
		description: 'The classification of a project.',
		type: ProjectClassificationDto,
	})
	async parseProject(@UploadedFile() file): Promise<ProjectClassificationDto> {
		return this.projectService.parseProjectClassification(file);
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
	@ApiOkResponse({
		type: ProjectDto,
	})
	async saveProject(@Body() projectDto: CreateProjectDto): Promise<ProjectDto> {
		return this.projectService.saveProject(projectDto);
	}
}
