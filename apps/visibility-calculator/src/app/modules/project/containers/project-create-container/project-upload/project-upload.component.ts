import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectFormStep, UploadFileStepPayload } from '../../../types/project-form.types';

@Component({
	selector: 'ro-ubb-project-upload',
	template: ` <div class="right-aligned p-1">
			<button
				mat-raised-button
				matStepperNext
				color="primary"
				[disabled]="!form.get('projectFile').value || !form.get('projectTitle').value"
				(click)="onNext()"
			>
				Next
			</button>
		</div>
		<div class="upload-container" [formGroup]="form">
			<mat-form-field appearance="fill">
				<mat-label>Project title</mat-label>
				<input matInput [formControlName]="titleControlName" />
			</mat-form-field>

			<mat-form-field appearance="fill">
				<mat-label>Description</mat-label>
				<textarea matInput [formControlName]="descriptionControlName"></textarea>
			</mat-form-field>

			<input
				type="file"
				class="file-input"
				accept=".zip,.rar,.7zip"
				(change)="onFileSelected($event)"
				[formControlName]="uploadControlName"
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
	@Input() uploadControlName: string;
	@Input() titleControlName: string;
	@Input() descriptionControlName: string;
	@Output() fileUpload: EventEmitter<UploadFileStepPayload> = new EventEmitter<UploadFileStepPayload>();
	fileName: string = null;
	file: File;

	onFileSelected(event) {
		this.file = event.target?.files?.[0];
		if (this.file) {
			this.fileName = this.file.name;
		}
	}

	onNext() {
		if (this.file) {
			this.fileUpload.emit({ type: ProjectFormStep.UploadFile, file: this.file });
		}
	}
}
