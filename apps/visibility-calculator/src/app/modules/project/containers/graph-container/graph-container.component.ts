import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Edge, Node } from '@swimlane/ngx-graph';
import { isEqual as _isEqual, isNil as _isNil } from 'lodash';
import { IGraph } from '@ro-ubb/api-interfaces';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-graph-container',
	template: ` <div *ngIf="nodes" class="h-100">
		<ngx-graph #graph [showMiniMap]="true" [nodes]="this.nodes" [links]="this.links">
			<ng-template #defsTemplate>
				<svg:marker id="arrow" viewBox="0 -5 10 10" refX="8" refY="0" markerWidth="4" markerHeight="4" orient="auto">
					<svg:path d="M0,-5L10,0L0,5" class="arrow-head" />
				</svg:marker>
			</ng-template>

			<ng-template #nodeTemplate let-node>
				<svg:g class="node">
					<svg:rect
						[attr.width]="node.dimension.width"
						[attr.height]="node.dimension.height"
						[attr.fill]="node.data.color"
					/>
					<svg:text alignment-baseline="central" [attr.x]="10" [attr.y]="node.dimension.height / 2">
						{{ node.label }}
					</svg:text>
				</svg:g>
			</ng-template>

			<ng-template #linkTemplate let-link>
				<svg:g class="edge">
					<svg:path class="line" stroke-width="2" marker-end="url(#arrow)"></svg:path>
					<svg:text class="edge-label" text-anchor="middle">
						<textPath
							class="text-path"
							[attr.href]="'#' + link.id"
							[style.dominant-baseline]="link.dominantBaseline"
							startOffset="50%"
						>
							{{ link.label }}
						</textPath>
					</svg:text>
				</svg:g>
			</ng-template>
		</ngx-graph>
	</div>`,
	styleUrls: [],
})
export class GraphContainerComponent implements OnChanges {
	@Input() graph: IGraph;

	nodes: Node[] = [];
	links: Edge[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		if (
			!_isNil(changes['graph'].currentValue) &&
			!_isEqual(changes['graph'].previousValue, changes['graph'].currentValue)
		) {
			this.graph = changes['graph'].currentValue;
			this.nodes =
				this.graph.nodes.map((node) => ({
					id: node.id,
					label: node.name,
				})) || [];

			this.graph.nodes.forEach((node) => {
				node.outgoingEdges.forEach((outgoingEdge) => {
					this.links.push({ source: node.id, target: outgoingEdge });
				});
			});
		}
	}
}
