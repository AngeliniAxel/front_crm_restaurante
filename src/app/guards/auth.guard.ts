import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('restaurant_token');
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
