import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TreeData } from 'mat-tree-select-input';
import { MappingStepPayload, ProjectFormStep } from '../../../types/project-form.types';
import { cloneDeep as _cloneDeep } from 'lodash';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IProjectDataClassification } from '@ro-ubb/api-interfaces';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-project-create-mappings',
	template: ` <div class="right-aligned p-1">
			<button mat-raised-button matStepperNext color="primary" (click)="onNext()">Next</button>
		</div>
		<form novalidate>
			<div class="grid-container" *ngFor="let dto of dtos">
				<span></span>
				<label>{{ dto?.name }} </label>

				<ngx-mat-tree-select-input-ngmodel
					(selectionChanged)="onSelect($event, dto)"
					[multiple]="true"
					[options]="options"
					[heading]="'Attributes of'"
					[placeholder]="'Select entity attributes/dto'"
					[canSelectParentNode]="false"
				>
				</ngx-mat-tree-select-input-ngmodel>
			</div>
		</form>`,
	styleUrls: ['project-create-mappings.component.scss'],
})
export class ProjectCreateMappingsComponent implements OnInit {
	@Input() form: FormGroup;
	@Output() dtoMappingsToFields: EventEmitter<MappingStepPayload> = new EventEmitter<MappingStepPayload>();

	dtos: IProjectDataClassification[] = [];
	dtoMapping: { [key: string]: TreeData[] } = {};
	options: TreeData[] = [];

	ngOnInit(): void {
		this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((updatedForm) => {
			this.dtos = _cloneDeep(updatedForm?.projectStructure?.classification?.dtos);

			if (updatedForm?.projectStructure?.classification?.entities) {
				this.options = this.constructTreeData(updatedForm?.projectStructure?.classification?.entities);
			}
		});
	}

	constructTreeData(data): TreeData[] {
		return data.map((item) => {
			return {
				name: item?.name ? item?.name : item?.variableName ? item?.variableName : '',
				value: item?.id,
				children: item?.variables?.length ? this.constructTreeData(item?.variables) : [],
			};
		});
	}

	onSelect(value: TreeData[], dto: IProjectDataClassification): void {
		this.dtoMapping[dto.id] = value;
	}

	onNext() {
		this.dtoMappingsToFields.emit({
			type: ProjectFormStep.Mapping,
			dtoMappings: this.dtoMapping,
		});
	}
}
