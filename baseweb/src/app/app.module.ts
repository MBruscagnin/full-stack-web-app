import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FootBarComponent } from './foot-bar/foot-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuctionDetailsComponent } from './auction-details/auction-details.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { CartComponent } from "./cart/cart.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { PrivateComponent } from "./private/private.component";
import { CreateComponent } from "./create/create.component";
import { ModComponent } from "./mod/mod.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageEditorComponent } from "./message-editor/message-editor.component";
import { PrivateMessagesComponent } from "./private-messages/private-messages.component";


// Services
import { BookService } from './book.service';
import { BookHttpService } from './book-http.service';
import { UserService } from './user.service';
import { UserHttpService } from './user-http.service';
import { MessageService } from './message.service';
import { MessageHttpService } from './message-http.service';

import { SocketioService } from './socketio.service';
import { importExpr } from '@angular/compiler/src/output/output_ast';
//import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'books/:_id', component: AuctionDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      {path: 'login', component: UserLoginComponent},
      {path: 'signup', component: UserSignupComponent},
      {path: 'private', component: PrivateComponent},
      {path: 'create', component: CreateComponent},
      {path: 'mod', component: ModComponent},
      {path: 'messages/:_id', component: MessageListComponent},
      {path: 'messages/:_id', component: PrivateMessagesComponent}
    ])
  ],
  providers: [
    {provide: UserService, useClass: UserHttpService },
    {provide: BookService, useClass: BookHttpService },
    {provide: SocketioService, useClass: SocketioService },
    {provide: MessageService, useClass: MessageHttpService }

  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    FootBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    AuctionDetailsComponent,
    CartComponent,
    ShippingComponent,
    UserLoginComponent,
    UserSignupComponent,
    PrivateComponent,
    CreateComponent,
    ModComponent,
    MessageListComponent,
    MessageEditorComponent,
    PrivateMessagesComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }