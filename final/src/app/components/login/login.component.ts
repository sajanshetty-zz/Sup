import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AppService } from "../../_services/app.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	constructor(private _AppService: AppService,
				private _toastr: ToastrService,
				private _router: Router) { }

	private _user: any = {
		email: '',
		password: ''
	}

	private _loggedInUser: any = {}
	private _isSubmitted: boolean = false

	private onSubmit() {
		this._isSubmitted = true;
		this._AppService.login(this._user)
			.subscribe(
				loggedInUser => {
					this._isSubmitted = false;
					this._loggedInUser = loggedInUser;
					this._toastr.success('You have logged in successfully!', 'Success');
					this._router.navigate(['/dashboard']);
				},
				error => {
					this._isSubmitted = false;
					this._toastr.error('User not found', 'Error');
				}
			)
	}

	ngOnInit(){}

}