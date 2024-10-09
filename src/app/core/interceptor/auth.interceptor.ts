import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '@services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _service = inject(StorageService);
  const authToken = _service.getToken() || '';
  if (req.url.includes('/management/api')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
      },
    });
    return next(authReq);
  }
  return next(req);
};
