import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogData {
	title: string;
	content: string;
}

@Component({
	selector: 'ro-ubb-confirmation-dialog',
	template: `
		<div class="h-100">
			<h1 mat-dialog-title class="mat-h1">{{ data.title }}</h1>
			<div mat-dialog-content>
				<p class="mat-body-1">{{ data.content }}</p>
			</div>
			<div mat-dialog-actions class="d-flex flex-end">
				<button mat-button (click)="cancel()">No</button>
				<button mat-raised-button color="primary" (click)="confirm()">Yes</button>
			</div>
		</div>
	`,
	styleUrls: ['confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
	) {}

	confirm(): void {
		this.dialogRef.close(true);
	}

	cancel(): void {
		this.dialogRef.close(false);
	}
}
