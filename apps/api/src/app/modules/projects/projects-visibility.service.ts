import { Injectable } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { NodeEntity } from './entities/node.entity';
import { isNil as _isNil } from 'lodash';
import { EntityVisibilityDto, FieldVisibilityDto } from './dtos/projects.dto';
import { NodeDto } from './dtos/projects-graph.dto';
import { NodeTypeEnum } from '@ro-ubb/api-interfaces';

@Injectable()
export class ProjectsVisibilityService {
	constructor(private projectsService: ProjectsService) {}

	async calculateVisibility(projectId: string, currentUserId: string): Promise<EntityVisibilityDto[]> {
		const graphDto = await this.projectsService.getGraphByProjectId(projectId, currentUserId);
		const nodesMap = new Map<string, NodeDto>();

		graphDto.nodes.forEach((node) => nodesMap.set(node.id, node));

		const entitiesNodes = graphDto.nodes.filter((n) => n.type === NodeTypeEnum.Entity);
		return entitiesNodes.map((entity) => this.getEntityVisibility(entity, nodesMap));
	}

	private getEntityVisibility(entity: NodeDto, nodes: Map<string, NodeDto>): EntityVisibilityDto {
		const fieldsVisibility = entity.outgoingEdges.map((fieldNodeId) => this.getFieldVisibility(fieldNodeId, nodes));
		return new EntityVisibilityDto({ entityName: entity.name, id: entity.id, fieldsVisibility });
	}

	private getFieldVisibility(fieldNodeId: string, nodes: Map<string, NodeDto>): FieldVisibilityDto {
		const fieldNode = nodes.get(fieldNodeId);
		const visibility = this.getNodeVisibility(fieldNode, nodes);
		return new FieldVisibilityDto({ fieldName: fieldNode.name, id: fieldNode.id, visibility });
	}

	private getNodeVisibility(node: NodeEntity, nodes: Map<string, NodeDto>): number {
		if (_isNil(node.incomingEdges) || node.incomingEdges.length === 0) {
			return 0;
		}
		if (node.type === NodeTypeEnum.ControllerMethod) {
			return 1;
		}

		return node.incomingEdges
			.map((nodeId) => this.getNodeVisibility(nodes.get(nodeId), nodes))
			.reduce((accum, value) => accum + value, 0);
	}
}
