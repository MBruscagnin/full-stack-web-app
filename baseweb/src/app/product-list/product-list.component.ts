import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { products } from '../products';
import { BookService } from "../book.service";
import { Book } from "../Book";
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products = products;
  public books: Book[] = [];
  public book: Book;
  public user: User = null;
  public price: number = 0;
  now = Date();
  same: boolean = false;
  choice: string = '';

  constructor(
    public bs: BookService,
    public us: UserService, 
    private router: Router
  ) {}

  @Output() posted = new EventEmitter<Book>();

  ngOnInit() {
    this.get_books();
  }

  public get_books(){
    this.bs.get_books().subscribe(
      (books) => {
        this.books = books;
      }
    )
  }

  public get_booksByUni(u){
    this.bs.get_booksByUni(u).subscribe(
      (books) => {
        this.books = books;
      }
    )
  }

  public get_booksByCourse(u){
    this.bs.get_booksByCourse(u).subscribe(
      (books) => {
        this.books = books;
      }
    )
  }

  public get_booksByZone(u){
    this.bs.get_booksByZone(u).subscribe(
      (books) => {
        this.books = books;
      }
    )
  }
/*
  same_choice(b){
    var i = 0;

    while ( i < this.books.length){// && !this.same){
      if(b == this.books[i].university) return true;
    }
    i++;
    return false;
    //this.same = true;
  }
 */
  set_empty() {
    this.book = { title: '',
    university: '',
    course: '',
    auctiondeadline: new Date(),
    startprice: 0,
    reserveprice: 0,
    zone: '',
    seller: '',
  winner:'' };
  }

  update_price(b: Book) {

   // console.log("Questa è l'offerta proposta: "+b.startprice);
   if(this.price <= b.startprice){
     alert("l'offerta deve essere maggiore di quella attuale");
     return;
   }
   b.startprice = this.price;
    this.bs.update_book(b).subscribe( (b) => {
      console.log('prezzo aggiornato');
 
      this.posted.emit( b );

    }, (error) => {
      console.log('Error occurred while posting: ' + error);

    });
  }

  delete(b: Book) {
     this.bs.delete_book(b).subscribe( (b) => {
       this.get_books();
       this.posted.emit( b );
       this.router.navigate(['/']);
     }, (error) => {
       console.log('Error occurred while deleting book: ' + error);
     });
   }

   delete_user(u){
    this.us.delete_user(u).subscribe( (u) => {
      this.get_books();
      this.posted.emit( u );
      this.router.navigate(['/']);
    }, (error) => {
      console.log('Error occurred while deleting user: ' + error);
    });
   }

  logout() {
    this.us.logout();
    this.router.navigate(['/']);
  }

  is_notExpired(d){
    
    return Date.parse(d) > Date.parse(this.now) ? true : false;
  }


/*

edit = function(kk) {
this.id = kk._id;
this.firstName= kk.firstName;
this.lastName= kk.lastName;
this.email= kk.email;
this.phoneNo= kk.phoneNo;
this.valbutton ="Update";
}
delete = function(id) {
  this.bs.delete_book(id).subscribe
  ( data => {
      alert(data.data) ;
      this.ngOnInit();
    }, error => this.errorMessage = error 
  )
}





  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
  */

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/