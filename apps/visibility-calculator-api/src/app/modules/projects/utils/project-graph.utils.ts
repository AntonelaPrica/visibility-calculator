import { NodeTypeEnum, ProjectClassificationDto, ProjectDataClassificationDto } from '@ro-ubb/api-interfaces';
import { GraphEntity } from '../entities/graph.entity';
import { NodeEntity } from '../entities/node.entity';
import { v4 as uuidv4 } from 'uuid';

export class ProjectGraphUtils {
	static parseClassificationToGraph(classification: ProjectClassificationDto): GraphEntity {
		const graph = new GraphEntity({ id: uuidv4() });
		const nodes = new Map<string, NodeEntity>(); // name -> NodeEntity
		const dtosMap = new Map<string, ProjectDataClassificationDto>();

		classification.dtos?.forEach((dto) => {
			const dtoId = uuidv4();
			dtosMap.set(dtoId, dto);
			nodes.set(dtoId, {
				id: dtoId,
				name: dto.name,
				type: NodeTypeEnum.Dto,
				incomingEdges: [],
				outgoingEdges: [],
			});
		});

		classification.entities?.forEach((entity) => {
			const entityId = uuidv4();
			nodes.set(entityId, {
				id: entityId,
				name: entity.name,
				type: NodeTypeEnum.Entity,
				incomingEdges: [],
				outgoingEdges: [],
			});

			entity.variables.forEach((entityField) => {
				const entityFieldId = uuidv4();
				nodes.set(entityFieldId, {
					id: entityFieldId,
					name: entityField.variableName,
					type: NodeTypeEnum.FieldEntity,
					incomingEdges: [entityId],
					outgoingEdges: [],
				});
				nodes.get(entityId).incomingEdges.push(entityFieldId);
			});
		});

		classification.controllers?.forEach((controller) => {
			const controllerId = uuidv4();
			nodes.set(controllerId, {
				id: controllerId,
				name: controller.name,
				type: NodeTypeEnum.Controller,
				incomingEdges: [],
				outgoingEdges: [],
			});
			controller.methods?.forEach((controllerMethod) => {
				const controllerMethodId = uuidv4();
				nodes.set(controllerMethodId, {
					id: controllerMethodId,
					name: controllerMethod.methodName,
					type: NodeTypeEnum.ControllerMethod,
					incomingEdges: [controllerId],
					outgoingEdges: [],
				});

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
		return graph;
	}
}
