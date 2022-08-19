import { IGraph, IGraphReference } from './api-project-graph.types';

export interface IProject {
	id: string;
	description: string;
	name: string;
	graph: IGraphReference;
}

export interface ICreateProject {
	name: string;
	description: string;
	graph: IGraph;
}

export interface IFieldVisibility {
	id: string;
	fieldName: string;
	visibility: number;
}

export interface IEntityVisibility {
	id: string;
	entityName: string;
	fieldsVisibility: IFieldVisibility[];
}
