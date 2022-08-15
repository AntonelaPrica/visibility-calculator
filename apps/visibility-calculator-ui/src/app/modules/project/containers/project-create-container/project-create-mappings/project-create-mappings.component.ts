import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TreeData } from 'mat-tree-select-input';
import { ProjectDataClassificationDto } from '../../../types/project-classification.types';
import { MappingStepPayload, ProjectFormStep } from '../../../types/project-form.types';

@Component({
	selector: 'ro-ubb-project-create-mappings',
	template: ` <div class="right-aligned">
			<button mat-raised-button matStepperNext color="primary" (click)="onNext()">Next</button>
		</div>
		<form novalidate>
			<div class="grid-container" *ngFor="let dto of dtos">
				<span></span>
				<label>{{ dto?.name }} </label>

				<ngx-mat-tree-select-input-ngmodel
					[(select)]="dtoMapping[dto?.id]"
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

	dtos: ProjectDataClassificationDto[] = [];
	dtoMapping: { [key: string]: TreeData[] } = {};
	options: TreeData[] = [];

	ngOnInit(): void {
		this.form.valueChanges.subscribe((updatedForm) => {
			this.dtos = updatedForm?.projectStructure?.classification?.dtos;

			if (updatedForm?.projectStructure?.classification?.entities) {
				this.options = this.constructTreeData(updatedForm?.projectStructure?.classification?.entities);
			}
		});
	}

	constructTreeData(data) {
		return data.map((item) => {
			return {
				name: item?.name ? item?.name : item?.variableName ? item?.variableName : '',
				value: item?.id,
				children: item?.variables?.length ? this.constructTreeData(item?.variables) : [],
			};
		});
	}

	onNext() {
		this.dtoMappingsToFields.emit({
			type: ProjectFormStep.Mapping,
			dtoMapping: this.dtoMapping,
		});
	}
}
