import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { UserDataService } from '../../Services/user-data/user-data.service';
import { Router } from '@angular/router';
import { ChatService } from '../../Services/chat/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _apiService= inject( AuthService)
  private _userService= inject( UserDataService)
  private _router= inject(Router)
  

  responseData: any;

  public credentials: any = {
    name: "",
    email: "",
    password: "",
  }

  submitForm(event: Event) {
    event.preventDefault()
    this._userService.setUserInfo(this.credentials)
    this.responseData = this._apiService.loginUser(this.credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        this._userService.setUserInfo(response);
        localStorage.setItem('jwt', response.jwtToken)
        
        this._router.navigate(['chat'])
      },
      (error) => {
        console.error('Login failed', error);
        // Handle error (e.g., show a notification)
      }
    )
  }
  registerUser(event: Event) {
    event.preventDefault()
    this._userService.setUserInfo(this.credentials)
    // this.responseData = this._apiService.registerUser(this.credentials).subscribe(
    //   (response) => {
    //     console.log("Registration Successfull", response)
    //     this._userService.setUserInfo(response)

    //   },
    //   (error) => {
    //     console.log("Error while registering", error)
    //   }
    // )
  }

}
