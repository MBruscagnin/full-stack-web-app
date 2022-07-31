import { Injectable } from '@angular/core';
import { Book } from './Book';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Injectable()
export class BookHttpService {

  private books = [];

  constructor( private http: HttpClient , private us: UserService) {
    console.log('Book service instantiated');
    console.log('User service token: ' + us.get_token() );
   }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        'body was: ' + JSON.stringify(error.error));
    }

    return throwError('Something bad happened; please try again later.');
  }

  private create_options( params = {} ) {
    return  {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + this.us.get_token(),
        'cache-control': 'no-cache',
        'Content-Type':  'application/json',
      }),
      params: new HttpParams( {fromObject: params} )
    };

  }

  get_books(): Observable<Book[]> {
    return this.http.get<Book[]>( this.us.url + '/books' ).pipe(
        tap( (data) => console.log(JSON.stringify(data))) ,
        catchError( this.handleError )
      );
  }

  get_booksById(u): Observable<Book> {
    return this.http.get<Book>( this.us.url + '/books/'+u._id ).pipe(
        tap( (data) => console.log(JSON.stringify(data))) ,
        catchError( this.handleError )
      );
  }

  get_booksByUni(u): Observable<Book[]> {
    return this.http.get<Book[]>( this.us.url + '/books?university='+u ).pipe(
        tap( (data) => console.log(JSON.stringify(data))) ,
        catchError( this.handleError )
      );
  }

  get_booksByCourse(u): Observable<Book[]> {
    return this.http.get<Book[]>( this.us.url + '/books?course='+u ).pipe(
        tap( (data) => console.log(JSON.stringify(data))) ,
        catchError( this.handleError )
      );
  }

  get_booksByZone(u): Observable<Book[]> {
    return this.http.get<Book[]>( this.us.url + '/books?zone='+u ).pipe(
        tap( (data) => console.log(JSON.stringify(data))) ,
        catchError( this.handleError )
      );
  }

  get_booksBySeller(u): Observable<Book[]> {
    return this.http.get<Book[]>( this.us.url + '/books?seller='+u ).pipe(
        tap( (data) => console.log(JSON.stringify(data))) ,
        catchError( this.handleError )
      );
  }

  get_booksByWinner(u): Observable<Book[]> {
    return this.http.get<Book[]>( this.us.url + '/books?winner='+u ).pipe(
        tap( (data) => console.log(JSON.stringify(data))) ,
        catchError( this.handleError )
      );
  }

  post_book( b: Book ): Observable<Book> {
    console.log('Posting ' + JSON.stringify(b) );
    return this.http.post<Book>( this.us.url + '/books', b,  this.create_options() ).pipe(
      catchError(this.handleError)
    );
  }
 
  update_book( b ){
  
    console.log('Updating book:' + JSON.stringify(b) + "that have id" + b._id);
    return this.http.put<Book>( this.us.url + '/books/'+b._id, b, this.create_options() ).pipe(
      catchError(this.handleError)
    );
  }

  update_winner( b ){
  
    console.log('Updating winner of the book:' + JSON.stringify(b) + "that have id" + b._id);
    return this.http.put<Book>( this.us.url + '/books/'+b._id, b, this.create_options() ).pipe(
      catchError(this.handleError)
    );
  }

  /*elimininare un libro */
  delete_book( b) {
    console.log('Deleting '+ JSON.stringify(b));
    return this.http.delete<Book>(this.us.url + '/books/'+b._id, this.create_options()).pipe(
      catchError(this.handleError)
    );
  }


}
