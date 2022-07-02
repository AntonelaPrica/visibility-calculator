import { ProjectEntity } from './entities/project.entity';
import { GraphDto, NodeDto, ProjectDto } from '@ro-ubb/api-interfaces';
import { NodeEntity } from './entities/node.entity';
import { GraphEntity } from './entities/graph.entity';

export class ProjectsMappers {
	static mapToProjectDto(projectEntity: ProjectEntity): ProjectDto {
		return new ProjectDto({
			id: projectEntity.id,
			name: projectEntity.name,
			graph: projectEntity.graph,
		});
	}

	static mapToGraphDto(graphEntity: GraphEntity): GraphDto {
		return new GraphDto({
			id: graphEntity.id,
			nodes: graphEntity.nodes,
		});
	}

	static mapToNodeEntity(nodeDto: NodeDto, graph: GraphEntity): NodeEntity {
		return new NodeEntity({
			id: nodeDto.id,
			name: nodeDto.name,
			outgoingEdges: nodeDto.outgoingEdges,
			incomingEdges: nodeDto.incomingEdges,
			type: nodeDto.type,
			graph,
		});
	}
}
