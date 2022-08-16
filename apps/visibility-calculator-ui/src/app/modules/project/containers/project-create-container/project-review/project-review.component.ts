import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GraphDto } from '../../../types/project-graph.types';
import { Edge, Node } from '@swimlane/ngx-graph';
import { ProjectFormStep, ProjectSubmitPayload } from '../../../types/project-form.types';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-project-review',
	template: ` <div class="right-aligned">
			<button mat-raised-button color="primary" (click)="onSubmit()">Submit</button>
		</div>
		<mat-drawer-container class="drawer-container">
			<mat-drawer-content>
				<div class="page">
					<ngx-graph #graph [showMiniMap]="true" [nodes]="this.nodes" [links]="this.links">
						<ng-template #defsTemplate>
							<svg:marker
								id="arrow"
								viewBox="0 -5 10 10"
								refX="8"
								refY="0"
								markerWidth="4"
								markerHeight="4"
								orient="auto"
							>
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
				</div>
			</mat-drawer-content>
		</mat-drawer-container>`,
	styleUrls: [],
})
export class ProjectReviewComponent implements OnInit {
	@Input() form: FormGroup;
	@Output() submitProject: EventEmitter<ProjectSubmitPayload> = new EventEmitter<ProjectSubmitPayload>();

	graph: GraphDto;
	nodes: Node[] = [];
	links: Edge[] = [];

	ngOnInit(): void {
		this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((updatedForm) => {
			this.graph = updatedForm?.projectStructure?.graph;

			this.nodes = this.graph?.nodes?.map((node) => ({
				id: node.id,
				label: node.name,
			}));

			this.links = []; // clear since it enters everytime there is a change in the main form

			this.graph?.nodes.forEach((node) => {
				node.outgoingEdges.forEach((outgoingEdge) => {
					this.links.push({ source: node.id, target: outgoingEdge });
				});
			});
		});
	}

	onSubmit() {
		this.submitProject.emit({ type: ProjectFormStep.ProjectSubmit });
	}
}
