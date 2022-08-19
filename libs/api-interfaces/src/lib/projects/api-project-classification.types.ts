import { IGraph } from './api-project-graph.types';

export enum EncapsulationType {
	public = 'public',
	private = 'private',
	protected = 'protected',
	none = 'none',
}

export interface IProjectMethodClassification {
	id?: string;
	encapsulationType?: EncapsulationType;
	returnType: string;
	methodName: string;
	input: string;
}

export interface IProjectVariableClassification {
	id?: string;
	encapsulationType?: EncapsulationType;
	variableType: string;
	variableName: string;
}

export interface IProjectDataClassification {
	id?: string;
	name: string;
	methods?: IProjectMethodClassification[];
	variables?: IProjectVariableClassification[];
}

export interface IProjectClassification {
	controllers: IProjectDataClassification[];
	entities: IProjectDataClassification[];
	dtos: IProjectDataClassification[];
}

export interface IProjectStructure {
	classification: IProjectClassification;
	graph: IGraph;
}
