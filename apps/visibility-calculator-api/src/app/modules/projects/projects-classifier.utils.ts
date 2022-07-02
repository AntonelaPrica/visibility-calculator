import {
	EncapsulationType,
	ProjectMethodClassificationDto,
	ProjectVariableClassificationDto,
} from '@ro-ubb/api-interfaces';

export class ProjectsClassifierUtils {
	static isController(fileData: string): boolean {
		return fileData.includes('@RestController');
	}

	static isEntity(fileData: string): boolean {
		return fileData.includes('@Entity');
	}

	static isDto(fileData: string): boolean {
		return !fileData.includes('@Entity') && fileData.includes('@Data');
	}

	static getMethods(fileData: string): ProjectMethodClassificationDto[] {
		const methods: ProjectMethodClassificationDto[] = [];
		const specialKeywordsException = ['new'];
		const regexExp = /(private|public|protected)*(\s+)([a-zA-Z<>]+)(\s+)([a-zA-Z]+)(\()(.*)(\))(.*)(\{)/gm;
		const foundMatches = [...fileData.matchAll(regexExp)];
		foundMatches.forEach((match) => {
			const encapsulationType = EncapsulationType[match[1]] || '';
			const returnType = match[3];
			const methodName = match[5];
			const input = match[7];
			if (!specialKeywordsException.includes(returnType)) {
				methods.push({
					encapsulationType,
					returnType,
					methodName,
					input,
				});
			}
		});
		return methods;
	}

	static getVariables(fileData: string): ProjectVariableClassificationDto[] {
		const variables: ProjectVariableClassificationDto[] = [];
		const regexExp = /(private|public|protected)*(\s+)([a-zA-Z<>]+)(\s+)(\w+)(;)/gm;
		const foundMatches = [...fileData.matchAll(regexExp)];
		foundMatches.forEach((match) => {
			const encapsulationType = EncapsulationType[match[1]] || '';
			const variableType = match[3];
			const variableName = match[5];
			variables.push({
				encapsulationType,
				variableType,
				variableName,
			});
		});
		return variables;
	}
}
