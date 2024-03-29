import { IUser, IUserAccessToken, IUserLogin, IUserRegister } from '@ro-ubb/api-interfaces';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, finalize, Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { httpOptionsFormUrlEncoded, httpOptionsJson } from '../../types/http-options.types';
import { defaultTo as _defaultTo } from 'lodash';
import { tap } from 'rxjs/operators';
import { isNil as _isNil } from 'lodash';
import { STORAGE_AUTHORIZATION_KEY } from '../types/auth.types';
import { LoadingManagerService } from '../../loading-manager.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private loadingManager: LoadingManagerService) {}
	private _isLoggedIn = false;
	private _currentUser: IUser = null;
	private _authError: boolean = null;

	loginChanged: ReplaySubject<boolean> = new ReplaySubject<boolean>();
	loginError: ReplaySubject<boolean> = new ReplaySubject<boolean>();

	set authError(value: boolean) {
		this._authError = value;
		this.loginError.next(this._authError);
	}

	get authError(): boolean {
		return this.authError;
	}

	setIsLoggedIn(value: boolean, token: string) {
		if (value) {
			localStorage.setItem(STORAGE_AUTHORIZATION_KEY, token);
			this._isLoggedIn = true;
		} else {
			localStorage.removeItem(STORAGE_AUTHORIZATION_KEY);
			this._isLoggedIn = false;
		}
		this.loginChanged.next(this._isLoggedIn);
	}

	get isLoggedIn(): boolean {
		const authorization = localStorage.getItem(STORAGE_AUTHORIZATION_KEY);
		return this._isLoggedIn || !_isNil(authorization);
	}

	get currentUser(): IUser | null {
		return _defaultTo(this._currentUser, null);
	}

	login(payload: IUserLogin): Observable<IUserAccessToken | null> {
		const body = new HttpParams().set('username', payload.username).set('password', payload.password);

		this.loadingManager.isLoading = true;
		return this.http.post<IUserAccessToken>(`api/auth/login`, body, httpOptionsFormUrlEncoded).pipe(
			tap((value) => {
				this.setIsLoggedIn(true, value.access_token);
			}),
			catchError(() => {
				this.setIsLoggedIn(false, null);
				this.authError = true;
				return of(null);
			}),
			finalize(() => (this.loadingManager.isLoading = false))
		);
	}

	register(payload: IUserRegister): Observable<IUser> {
		this.loadingManager.isLoading = true;
		return this.http
			.post<IUser>(`api/auth/register`, { ...payload }, httpOptionsJson)
			.pipe(finalize(() => (this.loadingManager.isLoading = false)));
	}

	logout(): Observable<null> {
		this.setIsLoggedIn(false, null);
		return of(null);
	}

	getUserById(id: string): Observable<IUser> {
		this.loadingManager.isLoading = true;
		return this.http
			.get<IUser>(`api/auth/users/${id}`, httpOptionsJson)
			.pipe(finalize(() => (this.loadingManager.isLoading = false)));
	}

	getCurrentUser(): Observable<IUser> {
		this.loadingManager.isLoading = true;
		return this.http
			.get<IUser>(`api/auth/users/me`, httpOptionsJson)
			.pipe(finalize(() => (this.loadingManager.isLoading = false)));
	}
}
