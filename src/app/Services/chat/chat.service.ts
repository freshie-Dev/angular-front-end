import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket | null = null;
  private readonly url = 'http://localhost:3001';
  private isSocketConnected = false;

  private messagesSubject = new BehaviorSubject<{ user: string, message: string } | null>(null);
  public messages$ = this.messagesSubject.asObservable();

  connectSocket(userData: { _id: string, name: string }): Observable<boolean> {
    if (this.isSocketConnected) {
      console.log("socket already connected")
      return of(true); // Return Observable with true if already connected
    }
    
    
    return new Observable<boolean>(observer => {
      this.socket = io(this.url, {
        query: {
          data: JSON.stringify(userData)
        },
        transports: ['websocket', 'polling', 'flashsocket']
      });
      if(this.socket) console.log("connected to socket")

      this.socket.on('connect', () => {
        this.isSocketConnected = true;
        observer.next(true);
        observer.complete();
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        observer.error(error);
      });

      this.socket.on('disconnect', () => {
        this.isSocketConnected = false;
      });

      // Listen for incoming messages
      this.socket.on('new_message', (data: { user: string, message: string }) => {
        this.messagesSubject.next(data);
      });
    });
  }

  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.isSocketConnected = false;
      this.socket = null;
    }
  }

  
  sendMessage(messageData: { to: string; from: string; message: string; date: Date }): void {
    this.socket?.emit('send_message', messageData, (response: { success: boolean; error?: string }) => {
        if (response.success) {
            console.log("Message sent successfully.");
        } else {
            console.error("Failed to send message:", response.error);
        }
    });
}


  receiveMessage(): Observable<{ user: string; message: string } | null> {
    return this.messages$;
  }
  

  // Local Storage handling methods
  getStoredChats(): any[] {
    const chats = localStorage.getItem('chats');
    return chats ? JSON.parse(chats) : [];
  }
  
  setStoredChats(data: any[]): void {
    localStorage.setItem('chats', JSON.stringify(data));
  }
}

// joinRoom(roomData: { roomId: string; userId: string }): void {
//   this.socket?.emit('join', roomData);
// }