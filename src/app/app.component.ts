import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from './Services/chat/chat.service';
import { AuthService } from './Services/auth/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from './Services/user-data/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  _userDataService = inject(UserDataService)
  _chatService = inject(ChatService)
  _authService =  inject(AuthService)
  _router = inject(Router)
  variable = ''

 constructor(
) {
 }

 logout() {
  const status = this._authService.logoutUser()
  if(status) {
    localStorage.removeItem('userInfo')
    this._userDataService.clearUserInfo()
    this._chatService.disconnectSocket()
    this._router.navigate([''])
  }
 }
}
