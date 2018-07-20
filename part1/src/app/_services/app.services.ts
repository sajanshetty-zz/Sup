import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	
	protected _baseUrl;
	
	protected _loginUrl; // Login URL

	constructor(private http: HttpClient) {
		this.setApiUrl();
	}

	/* Begin: Misc services */
	setApiUrl() {		
		this._baseUrl = 'http://localhost:1337/';		
		this._loginUrl = this._baseUrl + 'login'; // Login URL
	}
	
	login(data) {
		return this.http.post(this._loginUrl, data)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	private handleResponse = (res: Response) => {
		return res || {};
	}

	private handleError = (error: Response | any) => {
		console.error(error.message || error);
		return throwError(JSON.parse(error._body) || error);
	}
}
