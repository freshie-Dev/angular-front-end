import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatappComponent } from './components/chatapp/chatapp.component';
import { authGuard } from './guard/auth/auth.guard';
import { loginGuard } from './guard/auth/login.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'auth',
  //   component: LoginComponent
  // },
  {
    path: '',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'chat',
    component: ChatappComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
