import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../../Services/user-data/user-data.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)
  const _userService = inject(UserDataService)
  const userData = _userService.getUserInfo()
  if(userData) {
    return true
  } else {
    alert('Redirecting to login page')
    _router.navigate([''])
    return false
  }
};
