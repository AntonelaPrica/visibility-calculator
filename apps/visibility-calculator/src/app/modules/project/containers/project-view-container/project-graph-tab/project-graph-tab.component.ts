import { Component, Input } from '@angular/core';
import { IGraph } from '@ro-ubb/api-interfaces';

@Component({
	selector: 'ro-ubb-project-graph-tab',
	template: `<div *ngIf="projectGraph" class="full-page-height">
		<ro-ubb-graph-container [graph]="projectGraph"></ro-ubb-graph-container>
	</div>`,
	styleUrls: [],
})
export class ProjectGraphTabComponent {
	@Input() projectGraph: IGraph;
}
