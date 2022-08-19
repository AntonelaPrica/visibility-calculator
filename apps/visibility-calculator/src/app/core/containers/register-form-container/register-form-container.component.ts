import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../modules/shared/auth/services/auth.service';
import { Router } from '@angular/router';
import { IUserLogin, IUserRegister } from '@ro-ubb/api-interfaces';
import { firstValueFrom } from 'rxjs';
import { AppRoutePaths } from '../../../modules/shared/types/app-routes.types';
import { isNil as _isNil } from 'lodash';

@Component({
	selector: 'ro-ubb-register-form-container',
	templateUrl: 'register-form-container.component.html',
	styleUrls: ['register-form-container.component.scss'],
})
export class RegisterFormContainerComponent implements OnInit {
	formGroup: FormGroup;
	hasError = false;

	constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {}

	ngOnInit(): void {
		this.formGroup = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
			firstName: new FormControl(null, [Validators.required]),
			lastName: new FormControl(null, [Validators.required]),
		});
	}

	async onRegister(): Promise<void> {
		const payload: IUserRegister = { ...this.formGroup.value };
		const token = await firstValueFrom(this.authService.register(payload));
		if (!_isNil(token)) {
			await this.router.navigate([AppRoutePaths.Login]);
			return;
		}

		this.hasError = true;
		this.changeDetectorRef.detectChanges();
	}
}
