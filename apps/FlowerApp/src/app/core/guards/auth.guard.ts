import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../features/services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _tokenService = inject(TokenService);
  const router = inject(Router);
  const token = _tokenService.getToken();
  ///not Auth user
  if (!token) {
    router.parseUrl('/auth');
    return false;
  }

  return true;
};
