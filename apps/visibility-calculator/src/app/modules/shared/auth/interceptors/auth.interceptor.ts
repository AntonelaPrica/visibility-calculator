import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { STORAGE_AUTHORIZATION_KEY } from '../types/auth.types';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let updatedRequest: HttpRequest<unknown>;
		const jwtToken = localStorage.getItem(STORAGE_AUTHORIZATION_KEY);
		if (jwtToken) {
			updatedRequest = req.clone({
				headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
			});
		} else {
			updatedRequest = req.clone();
		}
		return next.handle(updatedRequest).pipe(
			tap((response) => {
				if (response instanceof HttpResponse) {
					if (response.status === 401) {
						localStorage.removeItem(STORAGE_AUTHORIZATION_KEY);
					}
				}
			})
		);
	}
}
