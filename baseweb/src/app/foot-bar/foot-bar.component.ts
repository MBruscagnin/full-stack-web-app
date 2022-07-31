import { Component, OnInit } from '@angular/core';
import { UserLoginComponent } from '../user-login/user-login.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-foot-bar',
  templateUrl: './foot-bar.component.html',
  styleUrls: ['./foot-bar.component.css']
})
export class FootBarComponent implements OnInit {

  public ul: UserLoginComponent;
  public logged: boolean = false;
  constructor( public us: UserService, 
    private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.us.logout();
    this.logged = false;
    this.router.navigate(['/']);
  }

}
