import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingManagerService } from '../../../modules/shared/loading-manager.service';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-loading-overlay-container',
	template: `<div class="page-overlay" *ngIf="isLoading">
		<div class="d-flex h-100 flex-centered"><mat-spinner></mat-spinner></div>
	</div>`,
	styleUrls: ['loading-overlay-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayContainerComponent implements OnInit {
	isLoading = false;

	constructor(private loadingManager: LoadingManagerService, private changeDetectorRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.loadingManager.loadingChanged.pipe(untilDestroyed(this)).subscribe((isLoading) => {
			this.isLoading = isLoading;
			this.changeDetectorRef.detectChanges();
		});
	}
}
