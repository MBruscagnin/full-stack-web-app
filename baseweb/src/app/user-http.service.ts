import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as jwtdecode from 'jwt-decode';
import { User } from './User';



interface TokenData {
  username:string,
  mail:string,
  address:string,
  roles:string[],
  id:string
}

@Injectable()
export class UserHttpService {

  private users = [];


  constructor( private http: HttpClient ) {
    console.log('User service instantiated');

  }

  public token = '';
  //public url = 'http://10.0.2.2:8080'; //mobile url, for testing android localhost
  public url = 'http://localhost:8080';

  login( mail: string, password: string, remember: boolean ): Observable<any> {

    console.log('Login: ' + mail + ' ' + password );
    const options = {
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa( mail + ':' + password),
        'cache-control': 'no-cache',
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };

    return this.http.get( this.url + '/login',  options, ).pipe(
      tap( (data) => {
        console.log(JSON.stringify(data));
        this.token = data.token;
        if ( remember ) {
          localStorage.setItem('auctionsbooks_token', this.token );
        }
      }));
  }

  logout() {
    console.log('Logging out');
    this.token = '';
    localStorage.setItem('auctionsbooks_token', this.token);
  }

  register( user ): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'cache-control': 'no-cache',
        'Content-Type':  'application/json',
      })
    };

    return this.http.post( this.url + '/users', user, options ).pipe(
      tap( (data) => {
        console.log(JSON.stringify(data) );
      })
    );

  }
/*
  get_allUser(): Observable<any>{
    return this.http.get( this.url + '/users', ).pipe(
      tap( (data) => {
        console.log(JSON.stringify(data) );
      })
    );

  }
*/
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

  get_address() {
    return (jwtdecode(this.token) as TokenData).address;
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
/*
  get_users(): Observable<User[]> {
    return this.http.get<User[]>( this.url + '/users', ).pipe(
      tap( (data) => {
        console.log(JSON.stringify(data));
      }));
  }

  /* return this.http.get( this.url + '/login',  options, ).pipe(
      tap( (data) => {
        console.log(JSON.stringify(data));
        this.token = data.token;
        if ( remember ) {
          localStorage.setItem('auctionsbooks_token', this.token );
        }
      }));
  }
 */

private create_options( params = {} ) {
  return  {
    headers: new HttpHeaders({
      authorization: 'Bearer ' + this.get_token(),
      'cache-control': 'no-cache',
      'Content-Type':  'application/json',
    }),
    params: new HttpParams( {fromObject: params} )
  };

}

  delete_user( u ) : Observable<any>{
    
    console.log('Deleting user '+ JSON.stringify(u));
    return this.http.delete(this.url + '/users/'+u, this.create_options()).pipe(
    );
  } 


}
