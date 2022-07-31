
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { mockbooks } from '../mock-books';
import { Book } from "../Book";

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css']
})
export class ModComponent implements OnInit {

  private imaseller = false;
  private books: Book[] = [];
  now = Date();
  public loggati: string = "Devi <b><a routerLink=\"/login \">loggarti</a></b> per accedere all'area riservata.";
 // private b: Book;

  bool: Boolean = false;

  constructor( public us: UserService, public bs: BookService, public router: Router ) { }

  @Output() won = new EventEmitter();

  ngOnInit() {

  //this.get_booksBySeller();
    this.not_logged();
  }

  public get_booksBySeller(){
    this.bs.get_booksBySeller(this.us.get_mail()).subscribe(
      (books) => {
        if(books) this.imaseller = true;
        this.books = books;
      }
    )
  }

  public get_books(){
    this.bs.get_books().subscribe(
      (books) => {
       // if(books) this.imaseller = true;
        this.books = books;
      }
    )
  }

  im_aSeller(){
    return this.imaseller;
  }

  im_theSeller(b){
    return b.seller == this.us.get_mail() ? false: true;
  }

  not_logged(){
    if(this.us.is_logged()){
     // this.get_booksByWinner();
     // this.get_booksBySeller();
     this.get_books();
    }
  }

  get_booksByWinner(){
    this.bs.get_booksByWinner(this.us.get_mail()).subscribe(
      (books) => {
        //if(books) this.imaseller = true;
        this.books = books;
      }
    )
  }

  im_interested(b){
    return b.winner === this.us.get_mail() ? true : false;
   /* if(b.seller == "") return true;
    return b.winner.localeCompare(this.us.get_mail());*/
  }


is_Expired(d){
  if( Date.parse(d) > Date.parse(this.now) ) {
    this.bool = true; 
  }else{
    this.bool = false;
  }
  return this.bool;
}

winner(b){
    return (b.startprice >= b.reserveprice) ? 
       true : false;
}


you_win(b) {
  if(b.winner == this.us.get_mail()){
    if(Date.parse(b.auctiondeadline) == Date.parse(this.now)) {
      console.log("asta del libro "+b.title+" vinta da " +b.winner);
      alert("hai vinto l'asta del libro: "+b.title);
      this.won.emit();
    }
  } 
}

  logout() {
    this.us.logout();
    this.router.navigate(['/']);
  }

}
