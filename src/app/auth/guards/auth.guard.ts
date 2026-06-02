import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(SharedTokenService);
  const router = inject(Router);

  if (tokenService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
