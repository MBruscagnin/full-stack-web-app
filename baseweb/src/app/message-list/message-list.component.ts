import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../Message';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SocketioService } from '../socketio.service';
import { BookService } from '../book.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  private messages: Message[] = [];
  //public book: string;
  bid;

  constructor( private sio: SocketioService , 
    public bs: BookService,
    public ms: MessageService, public us: UserService, 
    private router: Router ) { }

  ngOnInit() {
    this.get_messages();
    this.sio.connect().subscribe( (m) => {
      this.get_messages();
    });
  }

  public get_messages() {
    this.ms.get_messages().subscribe(
      ( messages ) => {
        this.messages = messages;

      } , (err) => {
        // We need to login again
        this.logout();
      }
    );
  }

  public get_bookId() {
    this.bid = window.location.href.slice(28);
    return this.bid;
  }

  correctId(b){
    return this.get_bookId() == b._id ? true : false;
  }

  public get_privMessages(b) {
    
    this.ms.get_privMessages(b).subscribe(
      ( messages ) => {
        this.messages = messages;

      } , (err) => {
        // We need to login again
        this.logout();
      }
    );
  }

  is_me(u){
    return u == this.us.get_mail() ? true : false;
  }

  thisBook(m){
    return m.book == this.get_bookId() ? true : false;
  }
  
  is_theSeller(){}

  logout() {
    this.us.logout();
    this.router.navigate(['/']);
  }

}
