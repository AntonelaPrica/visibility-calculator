import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../modules/shared/auth/services/auth.service';
import { IUserLogin } from '@ro-ubb/api-interfaces';
import { firstValueFrom } from 'rxjs';
import { isNil as _isNil } from 'lodash';
import { Router } from '@angular/router';
import { AppRoutePaths } from '../../../modules/shared/types/app-routes.types';

@Component({
	selector: 'ro-ubb-login-form-container',
	templateUrl: 'login-form-container.component.html',
	styleUrls: ['login-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormContainerComponent implements OnInit {
	formGroup: FormGroup;
	hasError = false;

	constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {}

	ngOnInit(): void {
		this.formGroup = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
		});
	}

	async onLogin(): Promise<void> {
		const payload: IUserLogin = { username: this.formGroup.value.email, password: this.formGroup.value.password };
		const token = await firstValueFrom(this.authService.login(payload));
		if (!_isNil(token)) {
			await this.router.navigate([AppRoutePaths.Projects]);
			return;
		}

		this.hasError = true;
		this.changeDetectorRef.detectChanges();
	}
}
