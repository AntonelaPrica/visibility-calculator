import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingManagerService {
	private _isLoading = false;
	loadingChanged: ReplaySubject<boolean> = new ReplaySubject<boolean>();

	set isLoading(value: boolean) {
		this._isLoading = value;
		this.loadingChanged.next(this._isLoading);
	}

	get isLoading(): boolean {
		return this._isLoading;
	}
}
