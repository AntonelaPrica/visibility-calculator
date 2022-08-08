import { Component, Input } from '@angular/core';
import { ProjectDataClassificationDto } from '@ro-ubb/api-interfaces';

@Component({
	selector: 'ro-ubb-project-classification-tree-structure',
	template: ``,
	styleUrls: ['project-classification-tree-structure.component.scss'],
})
export class ProjectClassificationTreeStructureComponent {
	@Input() classification: ProjectDataClassificationDto;
}
