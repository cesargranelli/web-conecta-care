import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { environment } from 'src/environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenService = inject(SharedTokenService);
  const token = tokenService.getToken();

  if (token && req.url.includes(environment.apiConnecta)) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => throwError(() => error))
  );
};
