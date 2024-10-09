import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token')
  if(token){
      return true;
  }
  const router = inject(Router);
    router.navigate(['/login']);
    return false;
};
