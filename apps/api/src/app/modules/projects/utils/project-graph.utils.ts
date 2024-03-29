import { GraphEntity } from '../entities/graph.entity';
import { NodeEntity } from '../entities/node.entity';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep as _cloneDeep } from 'lodash';
import { ProjectClassificationDto, ProjectDataClassificationDto } from '../dtos/projects-classification.dto';
import { NodeTypeEnum } from '@ro-ubb/api-interfaces';

export class ProjectGraphUtils {
	/**
	 * From a project classification without ids,
	 * return a graph and a new classification which
	 * contains the ids of the graph nodes
	 */
	static parseClassificationToGraph(classification: ProjectClassificationDto): {
		graph: GraphEntity;
		classification: ProjectClassificationDto;
	} {
		const clonedClassification = _cloneDeep(classification); // classification which will be enhanced with ids
		const graph = new GraphEntity({ id: uuidv4() });
		const nodes = new Map<string, NodeEntity>(); // name -> NodeEntity
		const dtosMap = new Map<string, ProjectDataClassificationDto>();

		clonedClassification.dtos?.forEach((dto) => {
			const dtoId = uuidv4();
			dto.id = dtoId;
			dtosMap.set(dtoId, dto);
			nodes.set(dtoId, {
				id: dtoId,
				name: dto.name,
				type: NodeTypeEnum.Dto,
				incomingEdges: [],
				outgoingEdges: [],
			});
		});

		clonedClassification.entities?.forEach((entity) => {
			const entityId = uuidv4();
			entity.id = entityId;

			nodes.set(entityId, {
				id: entityId,
				name: entity.name,
				type: NodeTypeEnum.Entity,
				incomingEdges: [],
				outgoingEdges: [],
			});

			entity.variables.forEach((entityField) => {
				const entityFieldId = uuidv4();
				entityField.id = entityFieldId;

				nodes.set(entityFieldId, {
					id: entityFieldId,
					name: entityField.variableName,
					type: NodeTypeEnum.FieldEntity,
					incomingEdges: [entityId],
					outgoingEdges: [],
				});
				nodes.get(entityId).outgoingEdges.push(entityFieldId);
			});
		});

		clonedClassification.controllers?.forEach((controller) => {
			const controllerId = uuidv4();
			controller.id = controllerId;

			nodes.set(controllerId, {
				id: controllerId,
				name: controller.name,
				type: NodeTypeEnum.Controller,
				incomingEdges: [],
				outgoingEdges: [],
			});
			controller.methods?.forEach((controllerMethod) => {
				const controllerMethodId = uuidv4();
				controllerMethod.id = controllerMethodId;

				nodes.set(controllerMethodId, {
					id: controllerMethodId,
					name: controllerMethod.methodName,
					type: NodeTypeEnum.ControllerMethod,
					incomingEdges: [controllerId],
					outgoingEdges: [],
				});

				//set also outgoing for controller node
				nodes.get(controllerId).outgoingEdges.push(controllerMethodId);

				const regexExp = /([a-zA-Z]*<)*([a-zA-Z1-9]+)(>)*/gm;
				const foundMatches = [...controllerMethod.returnType.matchAll(regexExp)];
				const curatedReturnType = foundMatches[0][2];
				const returnTypeBlacklist = ['void'];
				if (returnTypeBlacklist.includes(curatedReturnType)) {
					return;
				}

				const dtosKeys = Array.from(dtosMap.keys());
				const foundDtoKey = dtosKeys.find((dtoKey) => dtosMap.get(dtoKey).name.includes(curatedReturnType));
				if (foundDtoKey) {
					nodes.get(foundDtoKey).incomingEdges.push(controllerMethodId);
					nodes.get(controllerMethodId).outgoingEdges.push(foundDtoKey);
				}
			});
		});

		graph.nodes = Array.from(nodes.values());
		return { graph, classification: clonedClassification };
	}
}
