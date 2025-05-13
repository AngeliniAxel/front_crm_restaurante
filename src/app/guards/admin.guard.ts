import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

type decodedToken = {
  id: number;
  role: string;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('restaurant_token');

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  const decoded = jwtDecode(token) as decodedToken;

  if (decoded.role !== 'admin') {
    router.navigateByUrl('/menu');
    return false;
  }

  return true;
};
