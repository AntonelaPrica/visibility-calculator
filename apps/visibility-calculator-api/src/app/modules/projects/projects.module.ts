import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { NodeEntity } from './entities/node.entity';
import { GraphEntity } from './entities/graph.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ProjectEntity, NodeEntity, GraphEntity])],
	controllers: [ProjectsController],
	providers: [ProjectsService],
})
export class ProjectsModule {}
