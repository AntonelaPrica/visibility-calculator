import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	constructor(values: Partial<ProjectDto>) {
		if (values) {
			this.id = values.id;
			this.name = values.name;
		}
	}
}

export class CreateProjectDto {
	@ApiProperty()
	name: string;
}
