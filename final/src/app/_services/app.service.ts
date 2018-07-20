import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

// Include Models
import { User } from '../_models/user.model';
import { Product } from '../_models/product.model';

const headers = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		// 'Authorization': 'YOUR_TOKEN_HERE'
	})
}

@Injectable({
	providedIn: 'root'
})
export class AppService {
	
	protected _baseUrl;
	
	protected _loginUrl; // Login URL
	protected _userListUrl;
	protected _productListUrl;

	constructor(private http: HttpClient) {
		this.setApiUrl();
	}

	/* Begin: Misc services */
	setApiUrl() {		
		this._baseUrl = 'http://localhost:1337/';		
		this._loginUrl = this._baseUrl + 'login'; // Login URL
		this._userListUrl = this._baseUrl + 'user';
		this._productListUrl = this._baseUrl + 'product';
	}
	
	login(data) {
		return this.http.post(this._loginUrl, data)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	// Users
	getUsers(): Observable<User[]>{
		return this.http.get<User[]>(this._userListUrl, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	getUser(userId: number): Observable<User>{
		return this.http.get<User>(this._userListUrl + '/' + userId, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	addUser(user: User): Observable<User>{
		return this.http.post<User>(this._userListUrl, user, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	deleteUser(userId: number): Observable<User>{
		return this.http.delete<User>(this._userListUrl + '/' + userId, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	updateUser(user: User, userId: number): Observable<User>{
		return this.http.patch<User>(this._userListUrl + '/' + userId, user, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	// Products
	getProducts(): Observable<Product[]>{
		return this.http.get<Product[]>(this._productListUrl, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	getProduct(productId: number): Observable<Product>{
		return this.http.get<Product>(this._productListUrl + '/' + productId, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	addProduct(product: Product): Observable<Product>{
		return this.http.post<Product>(this._productListUrl, product, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	deleteProduct(productId: number): Observable<Product>{
		return this.http.delete<Product>(this._productListUrl + '/' + productId, headers)
			.pipe(
				map(this.handleResponse),
				catchError(this.handleError)
			);
	}

	updateProduct(product: Product, productId: number): Observable<Product>{
		return this.http.patch<Product>(this._productListUrl + '/' + productId, product, headers)
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
