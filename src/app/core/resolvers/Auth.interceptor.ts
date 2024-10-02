import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken =
    'U4yuGnibsiTc61L44EmIFWXPl8vYPaf7sBGUbaYYQg07dE5OqWPsBgHHcoRl';

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
