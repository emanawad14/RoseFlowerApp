import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../../features/services/token.service';
import { inject } from '@angular/core';

export const addTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const _TokenService = inject(TokenService);
  const token = _TokenService.getToken();

  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(request);
};






// Apply only to specific requests
//const shouldAttach = req.url.includes('/cart');

// if (token) {
//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return next(authReq);
// }
