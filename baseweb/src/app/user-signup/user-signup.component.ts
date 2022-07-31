import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  public errmessage = undefined;
  public user = { mail: '', password: '', username: '', roles: [] };
  //<HTMLInputElement> document.getElementById("moderator");
   

  constructor( public us: UserService, public router: Router ) { }

  ngOnInit() {
  }

  signup() {
    let element = <HTMLInputElement> document.getElementById("moderator");  
    if (element.checked) {this.user.roles[0] = 'MODERATOR';}
    else{return console.log("ciaoooooooo "+element)};
    this.us.register( this.user ).subscribe( (d) => {
      console.log('Registration ok: ' + JSON.stringify(d) );
      this.errmessage = undefined;
      this.router.navigate(['/login']);
    }, (err) => {
      console.log('Signup error: ' + JSON.stringify(err.error.errormessage) );
      this.errmessage = err.error.errormessage || err.error.message;

    });

  }

}
