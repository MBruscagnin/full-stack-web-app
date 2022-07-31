import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Location} from '@angular/common';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../Book';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public errmessage = undefined;
  date: Date;
  public book = {title: '', university: '', course: '',
   auctiondeadline: this.date, startprice: 0, reserveprice: 0, 
   zone: '', seller: '', winner: 'ancora nessuno'}

  constructor( public us: UserService,
     public bs: BookService,
      public router: Router,
      private _location: Location ) { }

  @Output() posted = new EventEmitter<Book>();

  ngOnInit() {
    this.set_empty();
  }


  set_empty() {
    this.book = {title: '', university: '', course: '',
    auctiondeadline: this.date, startprice: 0, reserveprice: 0, 
    zone: '', seller: '', winner: 'ancora nessuno'}
  }

  post_book(){
    console.log(this.us.get_address());
    this.book.seller = this.us.get_mail();
    this.book.winner = "ancora nessuno";
    this.bs.post_book( this.book ).subscribe( (b) => {
      console.log('book posted');
      this.set_empty();
      this.posted.emit( b);
      this._location.back();
    }, (error) => {
      console.log('Error occurred while posting book: ' + error);

    });
}

  test(){}

}
