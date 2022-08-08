import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../types/project-structure.types';

@Component({
	selector: 'ro-ubb-project-verifiy-structure',
	template: `
		<div class="grid-container" *ngFor="let dataSource of this.dataSources">
			<ro-ubb-project-classification-tree-structure
				[dataSource]="this.dataSource"
			></ro-ubb-project-classification-tree-structure>
		</div>
	`,
	styleUrls: ['project-verify-structure.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectVerifyStructureComponent implements OnInit {
	@Input() form: FormGroup;
	dataSources: MatTreeNestedDataSource<TreeNode>[] = [];

	constructor(private ref: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.form.valueChanges.subscribe((value) => {
			if (value?.projectStructure?.classification) {
				const trees = Object.keys(value?.projectStructure?.classification);
				for (const tree of trees) {
					const dataSource = new MatTreeNestedDataSource<TreeNode>();
					value?.projectStructure?.classification[tree].forEach((entity) => {
						const treeNode: TreeNode = { name: entity?.name, children: [] };
						entity?.methods?.forEach((method) => treeNode.children.push({ name: method?.methodName }));
						dataSource.data.push(treeNode);
					});
					this.dataSources.push(dataSource);
				}
			}
			this.ref.markForCheck();
		});
	}
}
