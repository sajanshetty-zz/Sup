import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../../_services/app.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

	private _submitted: boolean = false;
	private _userForm: FormGroup;
	private _editFlag: boolean = false;
	private _editId: number = 0;

	constructor(private _appService: AppService,
				private _toastr: ToastrService,
				private _router: Router,
				private _route: ActivatedRoute,
				private _fb: FormBuilder) { }

	ngOnInit() {
		this.createForm();
		this._route.params.subscribe(params => {
			if(params.userId && params.userId != 0){
				this._editFlag = true;
				this._editId = params.userId;
				this.getUser(params.userId);
			}
		});
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
		
		if(this._editFlag){ // Update user
			this._appService.updateUser(this._userForm.value, this._editId)
				.subscribe(
					user => {
						this._toastr.success(user.name + ' has been updated successfully!', 'Success');
						this._router.navigate(['/dashboard/users']);
					},
					error => {
						this._toastr.error('User not added', 'Error');
					}
				);
		}else{ // Add new user
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

	private getUser(userId: number){
		this._appService.getUser(userId)
			.subscribe(
				user => {
					this._userForm.patchValue({
						name: user.name,
						email: user.email,
						password: user.password,
						isAdmin: user.isAdmin
					})
				},
				error => {
					this._toastr.error('User not found', 'Error');
				}
			);
	}
}
