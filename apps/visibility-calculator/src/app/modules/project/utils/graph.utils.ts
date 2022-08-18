import { MappingStepPayload } from '../types/project-form.types';
import { cloneDeep as _cloneDeep, isNil as _isNil } from 'lodash';
import { IGraph } from '@ro-ubb/api-interfaces';

export class GraphUtils {
	static addDtoMappingsToGraph(mappingPayload: MappingStepPayload, graph: IGraph): IGraph {
		const clonedGraph = _cloneDeep(graph);
		const clonedMappingPayload = _cloneDeep(mappingPayload);
		const mappings = clonedMappingPayload.dtoMappings;

		const dtoIds: string[] = Object.keys(mappings);
		for (const dtoId of dtoIds) {
			const dtoNode = clonedGraph.nodes.find((node) => node.id === dtoId);
			if (_isNil(dtoNode)) {
				continue;
			}
			for (const dtoMapping of mappings[dtoId]) {
				const mappedNode = clonedGraph.nodes.find((node) => node.id === dtoMapping.value);

				dtoNode.outgoingEdges.push(mappedNode.id);
				mappedNode.incomingEdges.push(dtoNode.id);
			}
		}
		return clonedGraph;
	}
}
