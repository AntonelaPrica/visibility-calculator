import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TreeData } from 'mat-tree-select-input';

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
				[(select)]="dtoSelection[dtoMapping?.dto]"
				[multiple]="true"
				[options]="options"
				[heading]="'Attributes of'"
				[placeholder]="'Select entity attributes/dto'"
			>
			</ngx-mat-tree-select-input-ngmodel>
		</div>
	</form>`,
	styleUrls: ['project-create-mappings.component.scss'],
})
export class ProjectCreateMappingsComponent implements OnInit {
	@Input() form: FormGroup;
	dtos: any[] = [];
	dtosMappings: { dto: any; mappings: string }[] = [];

	dtoSelection: { [key: string]: string }[] = [];

	options: TreeData[] = [];

	ngOnInit(): void {
		this.form.valueChanges.subscribe((updatedForm) => {
			this.dtoSelection = [];
			this.dtosMappings = [];

			updatedForm?.projectStructure?.classification?.dtos.forEach((dto) => {
				const obj: any = {};
				obj[dto] = [];
				this.dtoSelection.push(obj);
				this.dtosMappings.push({ dto: dto, mappings: undefined });
			});

			console.log(updatedForm?.originalStructure?.classification);
			console.log(updatedForm?.projectStructure?.classification?.dtos);

			if (updatedForm?.originalStructure?.classification?.entities) {
				this.options = this.constructTreeData(updatedForm?.originalStructure?.classification?.entities);
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

	onSelectionChanged() {}
}
