import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/shared/auth/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUser } from '@ro-ubb/api-interfaces';
import { firstValueFrom, take } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../../modules/shared/types/app-routes.types';

@UntilDestroy()
@Component({
	selector: 'ro-ubb-navbar-container',
	templateUrl: 'navbar-container.component.html',
	styleUrls: ['navbar-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarContainerComponent implements OnInit {
	isLoggedIn = false;
	currentUser: IUser = null;

	constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {}

	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn;
		this.authService.loginChanged.pipe(untilDestroyed(this)).subscribe((isLoggedIn) => {
			this.isLoggedIn = isLoggedIn;
			this.getCurrentUser();
			this.changeDetectorRef.detectChanges();
		});
		this.getCurrentUser();
	}

	private getCurrentUser(): void {
		if (this.isLoggedIn) {
			this.authService
				.getCurrentUser()
				.pipe(take(1), untilDestroyed(this))
				.subscribe((user) => {
					this.currentUser = user;
					this.changeDetectorRef.detectChanges();
				});
		}
	}

	async onLogout(): Promise<void> {
		await firstValueFrom(this.authService.logout());
		await this.router.navigate([AppRoutePaths.Login]);
	}
}
