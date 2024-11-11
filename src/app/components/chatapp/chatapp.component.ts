import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat/chat.service';
import { UserDataService } from '../../Services/user-data/user-data.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth/auth.service';
import { SearchBarComponent } from './sub-components/search-bar/search-bar.component';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.scss'], // Note: corrected to 'styleUrls'
})
export class ChatappComponent implements OnInit, OnDestroy {
  //& Services
  private _chatService = inject(ChatService);
  private _userService = inject(UserDataService);
  private _authSrevice = inject(AuthService)

  //& Chat variables
  messages: { user: string; message: string }[] = [];
  newMessage: string = '';
  messageSubscription!: Subscription;

  //& Friend Request
  friendId: string = ''
  friends: any[] = []
  selectedChat: string = ''

  ngOnInit(): void {
    // Step 1: Connect to the socket 
    const userData = this._userService.getUserInfo() // {_id, name, email, jwtToken} 
    if (userData) {
      console.log("oninit, running 'this._chatService.connectSocket(userData);' ")
      this._chatService.connectSocket(userData).subscribe((next)=> console.log(next) );
    }

    // Step 2: Subscribe to incoming messages
    this.messageSubscription = this._chatService.receiveMessage().subscribe((message) => {
      if (message) {
        console.log(message)
        this.messages.push(message);
      }
    });
  }

  ngOnDestroy(): void {
    // Step 4: Unsubscribe from message observable and disconnect from socket
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this._chatService.disconnectSocket();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const userData = this._userService.getUserInfo();
      if (userData) {
        this._chatService.sendMessage({
          to: this.selectedChat,
          from: userData._id,
          message: this.newMessage,
          date: new Date()
        });
        this.newMessage = ''; // Clear input after sending
      }
    }
  }

  addFriend() {
    this._authSrevice.addFriend(this.friendId).subscribe(data => {
      this.friends.push(data)
    })
  }

  receiveSelectedChat(data: string) {
    this.selectedChat = data;
    console.log(this.selectedChat)
  }

}
