import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../../_services/app.service';

// Include Models
import { User } from '../../_models/user.model';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

	private _users: User[] = [];

	constructor(private _appService: AppService,
				private _toastr: ToastrService,) { }

	ngOnInit() {
		this.getUsers();
	}

	private getUsers(){
		this._appService.getUsers()
			.subscribe(
				users => {
					this._users = users;
				},
				error => {}
			)
	}
}
