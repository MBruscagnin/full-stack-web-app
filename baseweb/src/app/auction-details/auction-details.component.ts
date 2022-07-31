
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from "../book.service";
import { Book } from "../Book";
import { UserService } from '../user.service';
import { User } from '../User';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
 
export class AuctionDetailsComponent implements OnInit {
   
    bid;
    public books: Book[] = [];
    public book: Book;
   
    public user: User = null;
    public price: number = 0;
    now = Date();
    public title: string = '';
    private userDialog: string[] = [];
    private userIndex: number = 0;

  constructor(
    public bs: BookService,
    public us: UserService, 
    public ms: MessageService,
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

  public get_booksById(u){
    this.bs.get_booksById(u).subscribe(
      (books) => {
        this.book = books;
      }
    )
  }

  test(){
 
  }

  public get_bookId() {
    this.bid = window.location.href.slice(28);
    return this.bid;
}

correctId(b){
  return this.get_bookId() == b._id ? true : false;
}

/*
set_empty() {
  this.book = { 
    title: '',
  university: '',
  course: '',
  auctiondeadline: new Date(),
  startprice: 0,
  reserveprice: 0,
  zone: '',
  seller: '',
  winner: ''};
}
*/
update_winner(b){
  b.winner = this.us.get_mail();
  this.bs.update_winner(b).subscribe( (b) => {
    console.log('winner aggiornato');
    this.posted.emit( b );
  }, (error) => {
    console.log('Error occurred while posting: ' + error);

  });
}

update_price(b: Book) {

  if(this.price <= b.startprice){
    alert("l'offerta deve essere maggiore di quella attuale");
    return;
  }
  this.update_winner(b);
 // console.log("Questa è l'offerta proposta: "+b.startprice);
 b.startprice = this.price;
  this.bs.update_book(b).subscribe( (b) => {
    console.log('prezzo aggiornato');
    this.posted.emit( b );

  }, (error) => {
    console.log('Error occurred while posting: ' + error);

  });
}

update_book(b){
  //b.title = this.title;
  this.bs.update_book( b ).subscribe( (b) => {
    console.log('book updated');
    this.posted.emit( b);
  }, (error) => {
    console.log('Error occurred while posting book: ' + error);

  });
}

update_university(b){}

update_course(b){}

update_deadline(b){}

update_zone(b){}

delete(b: Book) {
   this.bs.delete_book(b).subscribe( (b) => {
     this.get_books();
     this.posted.emit( b );
   }, (error) => {
     console.log('Error occurred while deleting book: ' + error);
   });
 }

 delete_user(u){
  if(u == this.us.get_mail()){
    alert("non puoi eliminare te stesso!");
    return;
  }
  
  this.us.delete_user(u).subscribe( (u) => {
    this.get_books();
    this.posted.emit( u );
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

im_theSeller(b){
  return b.seller == this.us.get_mail() ? false: true;
}

mex_OnetoOne(b, u: string){
  //forse dovrei prendere l'id del libro dalla mail del venditore? b.seller?

  //solo se hai offerto puoi messaggiare privatamente col venditore! 
  //come url prendo la mail del venditore e il bid del libro
  //oppure quando clicchi sul pulsante viene mandato il tuo user id al venditore (non in chiaro)???
  //l'ultima mi piace. non appare lo uid, ma appare un pulsante (notifica?) in area riservata

  if(u != b.seller){
    this.userDialog[this.userIndex] = u;
    this.userIndex++;
    this.router.navigate(['/messages/'+b.seller+u]);
  }else{
  //  this.ms.get_privMessages();
    }
}

messaggi_privati(){
  if(this.userIndex > 0){
    return "hai nuovi messaggi";
  }
  return "non hai messaggi privati";
}

 /* addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  */

}