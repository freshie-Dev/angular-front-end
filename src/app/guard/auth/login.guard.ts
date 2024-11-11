// src/app/guard/auth/login.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../../Services/user-data/user-data.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _userService = inject(UserDataService);
  const userData = _userService.getUserInfo();

  if (userData) {
    _router.navigate(['/chat']); // Redirect to the chat page if already logged in
    return false;
  }
  return true;
};
