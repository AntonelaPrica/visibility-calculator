import { HttpHeaders } from '@angular/common/http';

export const httpOptionsFormUrlEncoded = {
	headers: new HttpHeaders({
		'Content-Type': 'application/x-www-form-urlencoded',
	}),
};
export const httpOptionsJson = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
};
