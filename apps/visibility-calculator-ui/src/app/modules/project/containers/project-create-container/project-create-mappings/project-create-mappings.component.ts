import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TreeData } from 'mat-tree-select-input';
import { ProjectDataClassificationDto } from '../../../types/project-classification.types';

@Component({
	selector: 'ro-ubb-project-create-mappings',
	template: ` <form>
		<div class="right-aligned">
			<button mat-raised-button matStepperNext color="primary">Next</button>
		</div>

		<div class="grid-container" *ngFor="let dtoMapping of dtosMappings">
			<span></span>
			<label>{{ dtoMapping?.dto?.name }} </label>

			<ngx-mat-tree-select-input-ngmodel
				(selectionChanged)="onSelectionChanged()"
				[(select)]="dtoSelection[dtoMapping?.dto?.name]"
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

	dtosMappings: { dto: ProjectDataClassificationDto; mappings: string }[] = [];
	dtoSelection: any[] = [];
	options: TreeData[] = [];

	ngOnInit(): void {
		this.form.valueChanges.subscribe((updatedForm) => {
			// need to be cleared otherwise values would be gathering due to subscription
			this.dtosMappings = [];

			updatedForm?.projectStructure?.classification?.dtos.forEach((dto) => {
				this.dtosMappings.push({ dto: dto, mappings: undefined });
			});

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

	onSelectionChanged() {
		console.log(this.dtoSelection);
	}
}
