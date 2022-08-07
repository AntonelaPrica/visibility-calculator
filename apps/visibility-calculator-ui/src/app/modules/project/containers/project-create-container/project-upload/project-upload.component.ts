import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectFormStep, UploadFileStepPayload } from '../../../types/project-form.types';

@Component({
	selector: 'ro-ubb-project-upload',
	template: `<div class="upload-container" [formGroup]="form">
		<input
			type="file"
			class="file-input"
			accept=".zip,.rar,.7zip"
			(change)="onFileSelected($event)"
			[formControlName]="controlName"
			#fileUpload
		/>
		<div class="file-upload">
			{{ fileName || 'No file uploaded yet.' }}
			<button mat-raised-button color="primary" (click)="fileUpload.click()">
				<mat-icon>file_upload</mat-icon>
			</button>
		</div>
	</div>`,
	styleUrls: ['project-upload.component.scss'],
})
export class ProjectUploadComponent {
	@Input() form: FormGroup;
	@Input() controlName: string;
	@Output() fileUpload: EventEmitter<UploadFileStepPayload> = new EventEmitter<UploadFileStepPayload>();
	fileName: string = null;

	onFileSelected(event) {
		const file: File = event.target?.files?.[0];

		if (file) {
			this.fileName = file.name;
			this.fileUpload.emit({ type: ProjectFormStep.UploadFile, file });
		}
	}
}
