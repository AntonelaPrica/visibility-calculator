import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'ro-ubb-project-create-mappings',
	template: `<div *ngFor="let dto of dtos">{{ dto?.name }} <input matInput [multiple]="true" /></div>`,
	styleUrls: [],
})
export class ProjectCreateMappingsComponent implements OnInit {
	@Input() form: FormGroup;
	dtos: any[] = [];

	ngOnInit(): void {
		this.form.valueChanges.subscribe((newValues) => {
			console.log(this.form.get('projectStructure').value?.classification?.dtos);
			this.dtos = this.form.get('projectStructure').value?.classification?.dtos;
		});
	}
}
