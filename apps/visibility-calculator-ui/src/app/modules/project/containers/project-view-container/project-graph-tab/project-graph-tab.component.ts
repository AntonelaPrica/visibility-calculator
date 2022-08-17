import { Component, Input } from '@angular/core';
import { GraphDto } from '../../../types/project-graph.types';

@Component({
	selector: 'ro-ubb-project-graph-tab',
	template: `<div *ngIf="projectGraph"><ro-ubb-graph-container [graph]="projectGraph"></ro-ubb-graph-container></div>`,
	styleUrls: [],
})
export class ProjectGraphTabComponent {
	@Input() projectGraph: GraphDto;
}
