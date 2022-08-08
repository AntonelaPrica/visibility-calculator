import { GraphDtoInterface } from './api-project-graph.types';

export enum EncapsulationType {
	public = 'public',
	private = 'private',
	protected = 'protected',
	none = 'none',
}

export class ProjectMethodClassificationDtoInterface {
	id?: string;
	encapsulationType?: EncapsulationType;
	returnType: string;
	methodName: string;
	input: string;
}

export class ProjectVariableClassificationDtoInterface {
	id?: string;
	encapsulationType?: EncapsulationType;
	variableType: string;
	variableName: string;
}

export class ProjectDataClassificationDtoInterface {
	id?: string;
	name: string;
	methods?: ProjectMethodClassificationDtoInterface[];
	variables?: ProjectVariableClassificationDtoInterface[];
}

export class ProjectClassificationDtoInterface {
	controllers: ProjectDataClassificationDtoInterface[] = [];
	entities: ProjectDataClassificationDtoInterface[] = [];
	dtos: ProjectDataClassificationDtoInterface[] = [];
}

export class ProjectStructureDtoInterface {
	classification: ProjectClassificationDtoInterface;
	graph: GraphDtoInterface;

	constructor(values: Partial<ProjectStructureDtoInterface>) {
		if (values) {
			this.classification = values.classification;
			this.graph = values.graph;
		}
	}
}
