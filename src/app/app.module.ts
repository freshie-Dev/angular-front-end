import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LoginComponent } from './components/login/login.component';
import { ChatappComponent } from './components/chatapp/chatapp.component';
import { RouterOutlet } from '@angular/router';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { SearchBarComponent } from './components/chatapp/sub-components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatappComponent,
    LoginComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,  // Add HttpClientModule for HTTP services
    SocketIoModule.forRoot(config),
    RouterOutlet,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Use `useClass` instead of `useValue`
      multi: true,
    },
    // You can add additional interceptors here as needed
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
