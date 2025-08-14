import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../features/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _TokenService = inject(TokenService);
  const router = inject(Router);
  const token = _TokenService.getToken();
  ///not Auth user
  if (!token) {
    router.parseUrl('');
    return false;
  }

  return true;
};
