import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../features/services/token.service';

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