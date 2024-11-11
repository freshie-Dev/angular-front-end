import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userInfo: any = null;

  // Set user information
  setUserInfo(userData: any): void {
    this.userInfo = userData;
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
  }

  // Get user information
  getUserInfo(): any {
    return this.userInfo || JSON.parse(localStorage.getItem('userInfo')!) ;
  }
  // Clear user information (e.g., on logout)
  clearUserInfo(): void {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('jwt')
    this.userInfo = null;
  }
  // Check if user is logged in
  isLoggedIn(): boolean {
    return  JSON.parse(localStorage.getItem('userInfo')!) !== null || this.userInfo !== null;
  }

  updateFriendRequests(updatedFR: any) {
    // Retrieve friend requests from userInfo or localStorage
    let friendRequests = this.userInfo?.friendRequests || JSON.parse(localStorage.getItem('userInfo')!).friendRequests;
  
    // Update friend requests by replacing the matching request with updatedFR
    friendRequests = friendRequests.map((req: any) => {
      if (req.friendRequest._id === updatedFR._id) {
        return { ...req, friendRequest: updatedFR };
      }
      return req;
    });
  
    // If needed, update userInfo and localStorage with the modified friendRequests array
    this.userInfo = { ...this.userInfo, friendRequests };
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }
  

}
