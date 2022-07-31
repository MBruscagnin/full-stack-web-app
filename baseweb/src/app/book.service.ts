import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './Book';
import { mockbooks } from './mock-books';
import { of } from 'rxjs';

@Injectable()
export class BookService {

  private books = mockbooks;
  private book;

  constructor( ) { }

  get_books(): Observable<Book[]> {
    return of( this.books );
  }

  get_booksById(u): Observable<Book> {
    return of( this.book );
  }

  get_booksByCourse(u): Observable<Book[]> {
    return of( this.books );
  }

  get_booksByZone(u): Observable<Book[]> {
    return of( this.books );
  }

  get_booksByUni(u): Observable<Book[]> {
    return of( this.books );
  }

  get_booksBySeller(u): Observable<Book[]> {
    return of( this.books );
  }

  get_booksByWinner(u): Observable<Book[]> {
    return of( this.books );
  }

  post_book( b: Book ): Observable<Book> {
    this.books.unshift(b);
    return of(b);
  }

  delete_book( b: Book ): Observable<Book>{
    console.log("libro eliminato");
    alert("libro eliminato");
    return of(b);
  }

  public update_book(b: Book): Observable<Book>{
    console.log("libro aggiornato");
    alert("libro aggiornato");
    return of(b);
  }

  public update_winner(b: Book): Observable<Book>{
     return of(b);
   } 

}
