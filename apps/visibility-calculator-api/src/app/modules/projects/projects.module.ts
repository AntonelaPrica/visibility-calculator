import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { NodeEntity } from './entities/node.entity';
import { GraphEntity } from './entities/graph.entity';
import { ProjectsVisibilityService } from './projects-visibility.service';

@Module({
	imports: [TypeOrmModule.forFeature([ProjectEntity, NodeEntity, GraphEntity])],
	controllers: [ProjectsController],
	providers: [ProjectsService, ProjectsVisibilityService],
})
export class ProjectsModule {}
