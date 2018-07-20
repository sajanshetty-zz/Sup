import { Component } from '@angular/core';
import {AppService } from './_services/app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _user = {
	  email: '',
	  password: ''
  }

  constructor(private _appService: AppService){}

  OnSubmit(){
    this._appService.login(this._user).subscribe(
      user => {
        console.log(user)
      },
      error => {

      }
    )
  }
}
