import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './Message';
import { mockmessages } from './mock-messages';
import { of } from 'rxjs';

@Injectable()
export class MessageService {

  private messages = mockmessages;

  constructor( ) { }

  get_messages(): Observable<Message[]> {
    return of( this.messages );
  }

  get_privMessages(u): Observable<Message[]> {
    return of( this.messages );
  }

  post_message( m: Message ): Observable<Message> {
   // m.authormail = 'admin@postmessages.it';
    this.messages.unshift(m);
    return of(m);
  }

  post_privMessage( m: Message ): Observable<Message> {
    // m.book = 'admin@postmessages.it';
     this.messages.unshift(m);
     return of(m);
   }

}
