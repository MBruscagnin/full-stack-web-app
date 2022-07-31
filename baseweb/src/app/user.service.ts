import { Injectable } from '@angular/core';
import * as jwtdecode from 'jwt-decode';
import { of } from 'rxjs';
import {throwError} from 'rxjs';
import { Observable } from 'rxjs';
import { User } from './User';
import { mockusers } from './mock-users';

interface TokenData {
  username:string,
  mail:string,
  address:string,
  roles:string[],
  id:string
}

@Injectable()
export class UserService {

  private users = mockusers;

  constructor() { }

  private token = '';
  public url = '';

  //public mail = 'admin@auctions.it';
  //public password = 'secret';

  login( mail: string, password: string, remember: boolean ): Observable<any> {
    console.log('Login: ' + mail + ' ' + password );

    // tslint:disable-next-line:max-line-length
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQURNSU4iLCJNT0RFUkFUT1IiXSwibWFpbCI6ImFkbWluQHBvc3RtZXNzYWdlcy5pdCIsImlkIjoiNWFjNGRkYzcxMWUwMzYwYmEyZGYzZjQ4IiwiaWF0IjoxNTIyODU2MjU3LCJleHAiOjE1MjI4NTk4NTd9.3p6TmJAMqL19h4-b_r2pBdyerdbHh_l3zA87ZTfqeYk';
    //this.token = JWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQURNSU4iLCJNT0RFUkFUT1IiXSwibWFpbCI6ImFkbWluQHBvc3RtZXNzYWdlcy5pdCIsImlkIjoiNWFjNGRkYzcxMWUwMzYwYmEyZGYzZjQ4IiwiaWF0IjoxNTIyODU2MjU3LCJleHAiOjE1MjI4NTk4NTd9.3p6TmJAMqL19h4-b_r2pBdyerdbHh_l3zA87ZTfqeYk');
    return of( {} );
  }

  renew(): Observable<any> {
    return throwError( 'not implemented' );
  }

  register( user ): Observable<any> {
    return throwError( { error: {errormessage: 'not implemented'}} );
  }

  logout() {
    this.token = '';
  }

  get_token() {
    return this.token;
  }

  get_username() {
    return (jwtdecode(this.token) as TokenData).username;
  }

  get_mail() {
    return (jwtdecode(this.token) as TokenData).mail;
  }

  get_id() {
    return (jwtdecode(this.token) as TokenData).id;
  }

  get_address(){
    return (jwtdecode(this.token) as TokenData).address;
  }

  /*SERVE ALL'ADMIN PER NON AUTOCANCELLARSI */
  is_me(mail: string){
    return mail != this.get_mail() ? true : false;
  }

  public is_logged(): boolean{
    if (this.token != '')
      return true;
    return false;
  }

  is_admin(): boolean {
    const roles = (jwtdecode(this.token) as TokenData).roles;
    for ( let idx = 0; idx < roles.length; ++idx ) {
      if ( roles[idx] === 'ADMIN' ) {
        return true;
      }
    }
    return false;
  }

  is_moderator(): boolean {
    const roles = (jwtdecode(this.token) as TokenData).roles;
    for ( let idx = 0; idx < roles.length; ++idx ) {
      if ( roles[idx] === 'MODERATOR' ) {
        return true;
      }
    }
    return false;
  }

  is_sameuser(u): boolean {
    console.log(u);
    return this.get_mail() == u ? false : true;
  }

  delete_user( u ): Observable<any>{
    console.log("utente eliminato");
    
    alert("utente "+u+" eliminato");
    return of(u);
  }

  get_allUser(): Observable<any> {
    return throwError( ' niente mail' );
  }

}
