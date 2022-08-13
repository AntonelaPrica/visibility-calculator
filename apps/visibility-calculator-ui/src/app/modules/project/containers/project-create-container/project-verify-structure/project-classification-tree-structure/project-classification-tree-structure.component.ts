import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from '../../../../types/project-structure.types';
import { NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'ro-ubb-project-classification-tree-structure',
	template: ` <div *ngIf="this.dataSource">
		<mat-tree [dataSource]="this.dataSource" [treeControl]="treeControl" class="tree">
			<mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle>
				<mat-checkbox
					class="checklist-leaf-node"
					[checked]="checklistSelection.isSelected(node)"
					(change)="itemSelectionToggle(node)"
					>{{ node.name }}</mat-checkbox
				>
			</mat-tree-node>

			<mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
				<div class="mat-tree-node">
					<button mat-icon-button matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
						<mat-icon class="mat-icon-rtl-mirror">
							{{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
						</mat-icon>
					</button>
					<mat-checkbox
						[checked]="descendantsAllSelected(node)"
						[indeterminate]="descendantsPartiallySelected(node)"
						(change)="nestedItemSelectionToggle(node)"
						>{{ node.name }}</mat-checkbox
					>
				</div>
				<div [class.tree-invisible]="!treeControl.isExpanded(node)" role="group">
					<ng-container matTreeNodeOutlet></ng-container>
				</div>
			</mat-nested-tree-node>
		</mat-tree>
	</div>`,
	styleUrls: ['project-classification-tree-structure.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectClassificationTreeStructureComponent implements OnChanges {
	@Input() dataSource: MatTreeNestedDataSource<TreeNode>;
	@Output() selectionChanged: EventEmitter<{ selectionModel: SelectionModel<TreeNode>; classificationKey: string }> =
		new EventEmitter<{ selectionModel: SelectionModel<TreeNode>; classificationKey: string }>();

	treeControl: NestedTreeControl<TreeNode> = new NestedTreeControl<TreeNode>((node) => node.children);
	checklistSelection: SelectionModel<TreeNode> = new SelectionModel<TreeNode>(true);

	hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

	descendantsAllSelected(node: TreeNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		return descendants.every((child) => this.checklistSelection.isSelected(child));
	}

	descendantsPartiallySelected(node: TreeNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const result = descendants.some((child) => this.checklistSelection.isSelected(child));
		return result && !this.descendantsAllSelected(node);
	}

	nestedItemSelectionToggle(node: TreeNode): void {
		this.checklistSelection.toggle(node);
		const descendants = this.treeControl.getDescendants(node);
		this.checklistSelection.isSelected(node)
			? this.checklistSelection.select(...descendants)
			: this.checklistSelection.deselect(...descendants);

		this.selectionChanged.emit({
			selectionModel: this.checklistSelection,
			classificationKey: this.dataSource.data[0]?.name,
		});
	}

	itemSelectionToggle(node: TreeNode): void {
		this.checklistSelection.toggle(node);
		this.selectionChanged.emit({
			selectionModel: this.checklistSelection,
			classificationKey: this.dataSource.data[0]?.name,
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.dataSource && this.dataSource?.data.length > 0) {
			this.treeControl.expand(this.dataSource?.data[0]);
		}
	}
}
