import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectEntityVisibilityDto } from '../../../types/project-visibility.types';

@Component({
	selector: 'ro-ubb-project-visibility-tab',
	template: ` <div *ngIf="projectVisibility">
		<mat-accordion multi>
			<mat-expansion-panel *ngFor="let entityVisibility of projectVisibility">
				<mat-expansion-panel-header>
					<mat-panel-title>{{ entityVisibility.entityName }}</mat-panel-title>
				</mat-expansion-panel-header>
				<table mat-table [dataSource]="entityVisibility.fieldsVisibility" class="mat-elevation-z8" style="width: 40%">
					<ng-container matColumnDef="fieldName">
						<th mat-header-cell *matHeaderCellDef>Attribute</th>
						<td mat-cell *matCellDef="let attribute">{{ attribute.fieldName }}</td>
					</ng-container>
					<ng-container matColumnDef="visibility">
						<th mat-header-cell *matHeaderCellDef>Visibility</th>
						<td mat-cell *matCellDef="let attribute">{{ attribute.visibility }}</td>
					</ng-container>
					<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
					<tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
				</table>
			</mat-expansion-panel>
		</mat-accordion>
	</div>`,
	styleUrls: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectVisibilityTabComponent {
	@Input() projectVisibility: ProjectEntityVisibilityDto[];

	displayedColumns: string[] = ['fieldName', 'visibility'];
}
