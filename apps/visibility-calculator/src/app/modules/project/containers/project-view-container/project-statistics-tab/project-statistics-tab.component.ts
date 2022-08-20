import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnChanges,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { IEntityVisibility } from '@ro-ubb/api-interfaces';
import { isEqual as _isEqual, isNil as _isNil } from 'lodash';
import * as Plot from '@observablehq/plot';

@Component({
	selector: 'ro-ubb-project-statistics-tab',
	template: `
		<div class="p-1">
			<h2>Entity Visibility Levels</h2>
			<div #visibilityPerLevel></div>
		</div>
	`,
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectStatisticsTabComponent implements OnChanges {
	@ViewChild('visibilityPerLevel', { static: true }) visibilityPerLevelRef: ElementRef;
	@Input() projectVisibility: IEntityVisibility[] = [];

	entityVisibilityLevelsBarSvg = null;
	visibilityLevelsPerEntity: Array<{ name: string; value: number }> = [];

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngOnChanges(changes: SimpleChanges) {
		if (
			!_isNil(changes['projectVisibility'].currentValue) &&
			!_isEqual(changes['projectVisibility'].previousValue, changes['projectVisibility'].currentValue)
		) {
			this.projectVisibility = changes['projectVisibility']?.currentValue || [];
			if (this.projectVisibility.length > 0) {
				this.constructStatistics();
				this.buildGraphics();
			}
		}
	}

	private constructStatistics(): void {
		this.visibilityLevelsPerEntity = this.projectVisibility
			.reduce((accum, val) => [...accum, { name: this.getEntityName(val), value: this.getEntityVisibility(val) }], [])
			.sort((a, b) => b.value - a.value);
	}

	private buildGraphics(): void {
		this.createVisibilityLevelsBar();
		this.changeDetectorRef.detectChanges();
	}

	private createVisibilityLevelsBar(): void {
		this.entityVisibilityLevelsBarSvg = Plot.plot({
			x: {
				label: 'Entities',
			},
			y: {
				label: 'Visibility (%)',
				grid: true,
				transform: (d) => d * 100,
			},
			color: {
				legend: true,
			},
			marks: [
				Plot.frame(),
				Plot.barY(this.visibilityLevelsPerEntity, {
					x: 'name',
					y: 'value',
					fill: '#673ab7',
					sort: { x: 'y' },
					insetLeft: 0.5,
					insetRight: 0.5,
				}),
			],
		});
		this.visibilityPerLevelRef.nativeElement.append(this.entityVisibilityLevelsBarSvg);
	}

	private getEntityVisibility(entity: IEntityVisibility): number {
		const fieldVisibilityCount = entity.fieldsVisibility.length > 0 ? entity.fieldsVisibility.length : 1;
		return entity.fieldsVisibility.reduce((accum, val) => accum + val.visibility, 0) / fieldVisibilityCount;
	}

	private getEntityName(entity: IEntityVisibility): string {
		return entity.entityName.split('/').at(-1);
	}
}
