import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataService } from '../user-data/user-data.service';
import { ChatService } from '../chat/chat.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = "http://localhost:3001"

  constructor(
    private _http: HttpClient,
    private _userDataService: UserDataService,
    private _chatService: ChatService
  ) { }

  loginUser(userData: object): Observable<any> {
    return this._http.post<any>(`${this.baseApiUrl}/api/user/auth`, userData);
  }
  addFriend(friendId: string): Observable<any>  {
    return this._http.post<any>(`${this.baseApiUrl}/api/user/add-friend`, {friendId});
  }
  respondToFriendRequest(data: any) {
    return this._http.post<any>(`${this.baseApiUrl}/api/user/respond-to-request`, data)
  }
  fetchChat(friendId: any) {
    return this._http.post<any>(`${this.baseApiUrl}/api/message/fetch-chat`, {friendId})
  }
  logoutUser() {
    return true
  }
  
  // registerUser(userData: object) {
  //   const response = this.http.get<any>(`${this.baseApiUrl}/api/users/register`, userData, { withCredentials: true})
  //   console.log(response)
  //   return response
  // }
}
