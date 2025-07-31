import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../../features/services/token.service';
import { inject } from '@angular/core';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _TokenService = inject(TokenService);
  const token = _TokenService.getToken();
  // Apply only to specific requests
  const shouldAttach = req.url.includes('/cart');

  if (token && shouldAttach) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
