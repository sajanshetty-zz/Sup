import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../../_services/app.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

	private _submitted: boolean = false;
	private _userForm: FormGroup;

	constructor(private _appService: AppService,
				private _toastr: ToastrService,
				private _router: Router,
				private _fb: FormBuilder) { }

	ngOnInit() {
		this.createForm();
	}

	private createForm(){
		this._userForm = this._fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			isAdmin: [false, Validators.required],
		});
	}

	get userForm(){ return this._userForm.controls; }

	private onSubmit(){
		this._submitted = true;

		if (this._userForm.invalid) {
            return;
		}
		
		this._appService.addUser(this._userForm.value)
			.subscribe(
				user => {
					this._toastr.success(user.name + ' has been added successfully!', 'Success');
					this._router.navigate(['/dashboard/users']);
				},
				error => {
					this._toastr.error('User not added', 'Error');
				}
			);	
	}
}
