import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public errmessage = undefined;
  public loginFlag: boolean = false;
  constructor( private us: UserService, private router: Router, private _location: Location ) { }

  ngOnInit() {
  }

  login( mail: string, password: string, remember: boolean ) {
    this.us.login( mail, password, remember).subscribe( (d) => {
      console.log('Login granted: ' + JSON.stringify(d) );
      console.log('User service token: ' + this.us.get_token() );
      this.errmessage = undefined;
      this.loginFlag = true;

      this._location.back();
      //this.router.navigate(['/']);
    }, (err) => {
      console.log('Login error: ' + JSON.stringify(err) );
      this.errmessage = err.message;
      window.alert('Password o Email errate!');
    });

  }
/*
  public getLoginFlag(): boolean{
    return this.loginFlag;
  }
*/
}
