import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../Services/auth/auth.service';
import { UserDataService } from '../../../../Services/user-data/user-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  private _apiService= inject( AuthService)
  private _userService= inject( UserDataService)

  friendrequests: any[] = [];
  friends: any[] = [];

  @Output() dataEvent = new EventEmitter<string>();

  ngOnInit(): void {
      this.friendrequests = this._userService.getUserInfo().friendRequests
      this.friends = this._userService.getUserInfo().friends
      console.log("from search bar",this.friendrequests)
  }

  responseToRequest(response:string, FRId: string) {
    this._apiService.respondToFriendRequest({response, FRId}).subscribe(response => {
      console.log(response)
      this._userService.updateFriendRequests(response.updatedFriendRequest)
    })
  }
  
  selectChat(friendId: any) {
    this.dataEvent.emit(friendId);
  }
}
