import { Injectable } from '@angular/core';
import { CanActivate } from '@nestjs/common';
import { Router } from '@angular/router';
import { isNil as _isNil } from 'lodash';
import { AppRoutePaths } from '../../types/app-routes.types';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	async canActivate(): Promise<boolean> {
		if (_isNil(localStorage.getItem('authorization'))) {
			await this.router.navigate([AppRoutePaths.Login]);
			return false;
		}
		return true;
	}
}
