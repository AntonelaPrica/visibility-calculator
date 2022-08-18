import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ProjectFormStep, VerifyStructureStepPayload } from '../../../types/project-form.types';
import { SelectionModel } from '@angular/cdk/collections';
import { cloneDeep as _cloneDeep } from 'lodash';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IProjectClassification, IProjectStructure } from '@ro-ubb/api-interfaces';
import { TreeNode } from '../../../types/project-structure.types';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-project-verifiy-structure',
	template: `
		<div class="right-aligned p-1">
			<button mat-raised-button matStepperNext color="primary" (click)="onNext()">Next</button>
		</div>
		<div class="grid-container" *ngFor="let dataSource of this.dataSources">
			<ro-ubb-project-classification-tree-structure
				[dataSource]="this.dataSource"
				(selectionChanged)="onSelectionChanged($event)"
			></ro-ubb-project-classification-tree-structure>
		</div>
	`,
	styleUrls: ['project-verify-structure.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectVerifyStructureComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() originalProjectStructure: IProjectStructure;
	@Output() verifiedStructure: EventEmitter<VerifyStructureStepPayload> =
		new EventEmitter<VerifyStructureStepPayload>();

	dataSources: MatTreeNestedDataSource<TreeNode>[] = [];
	modifiedProjectClassification: IProjectClassification = { controllers: [], entities: [], dtos: [] };

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			if (value?.projectStructure?.classification) {
				const trees = Object.keys(value?.projectStructure?.classification);
				for (const tree of trees) {
					const dataSource = new MatTreeNestedDataSource<TreeNode>();
					const rootTreeNode: TreeNode = { id: '', name: tree, children: [] };

					value?.projectStructure?.classification[tree].forEach((entity) => {
						const treeNode: TreeNode = { id: entity?.id, name: entity?.name, children: [] };
						entity?.methods?.forEach((method) => treeNode.children.push({ id: method?.id, name: method?.methodName }));
						rootTreeNode.children.push(treeNode);
					});
					dataSource.data.push(rootTreeNode);
					this.dataSources.push(dataSource);
				}
			}
			this.changeDetectorRef.markForCheck();
		});
	}

	onSelectionChanged(payload: { selectionModel: SelectionModel<TreeNode>; classificationKey: string }) {
		const selectedNodeIds = payload.selectionModel.selected
			.map((selectedNode) => selectedNode.id)
			.filter((id) => id !== '');

		let classificationData = _cloneDeep(this.originalProjectStructure?.classification[payload.classificationKey]);

		classificationData = classificationData.filter((classificationEntry) =>
			selectedNodeIds.includes(classificationEntry?.id)
		);

		for (const classificationEntry of classificationData) {
			if (classificationEntry?.methods) {
				classificationEntry.methods = classificationEntry?.methods.filter((method) =>
					selectedNodeIds.includes(method?.id)
				);
			}
		}
		this.modifiedProjectClassification[payload.classificationKey] = classificationData;
	}

	onNext() {
		this.verifiedStructure.emit({
			type: ProjectFormStep.VerifyStructure,
			projectClassification: this.modifiedProjectClassification,
		});
	}
}
