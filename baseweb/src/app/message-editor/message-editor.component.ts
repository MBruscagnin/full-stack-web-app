import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import {Message} from '../Message';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.css']
})
export class MessageEditorComponent implements OnInit {

    private bid: string;

  constructor( private ms: MessageService,
    private us: UserService
     ) { }
  public message: Message;


  @Output() posted = new EventEmitter<Message>();

  ngOnInit() {
    this.set_empty();
  }

  set_empty() {
    this.message = { content: '', timestamp: new Date(), authormail: '', book: '' };
  }
/*
  get_tags() {
    return this.message.tags;
  }

  add_tag( tag: string ) {
    this.message.tags = this.message.tags.concat([ tag]);
  }*/

  post_message( ) {
    this.message.timestamp = new Date();
    this.message.authormail = this.us.get_mail();
    this.message.book = this.get_bookId();
    this.ms.post_message( this.message ).subscribe( (m) => {
      console.log('Message posted');
      this.set_empty();
      this.posted.emit( m );

    }, (error) => {
      console.log('Error occurred while posting: ' + error);

    });
  }

  public get_bookId() {
    this.bid = window.location.href.slice(28);
    return this.bid;
}


  post_privMessage() {
    this.message.timestamp = new Date();
    this.message.authormail = this.us.get_mail();
    this.message.book = this.bid;
    this.ms.post_message( this.message ).subscribe( (m) => {
      console.log('Message posted');
      this.set_empty();
      this.posted.emit( m );

    }, (error) => {
      console.log('Error occurred while posting: ' + error);

    });
  }

}
