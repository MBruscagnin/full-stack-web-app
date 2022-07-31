import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../Message';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SocketioService } from '../socketio.service';
import { BookService } from '../book.service';
import { Book } from '../Book';

@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.css']
})
export class PrivateMessagesComponent implements OnInit {

  public messages: Message[] = [];
  private b: Book;

  constructor( private sio: SocketioService , 
    public bs: BookService,
    public ms: MessageService, public us: UserService, private router: Router ) { }

  ngOnInit() {
    this.get_privMessages(this.b);
    this.sio.connect().subscribe( (m) => {
      this.get_privMessages(this.b);
    });
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

  
  is_theSeller(){}

  logout() {
    this.us.logout();
    this.router.navigate(['/']);
  }

}
