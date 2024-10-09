import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const verifyAuthGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const router = inject(Router);
    router.navigate(['/home']);
    return false;
  }
  return true;
};
