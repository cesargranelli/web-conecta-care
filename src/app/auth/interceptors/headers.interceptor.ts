import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cloned = req.clone({
    setHeaders: { 'Content-Type': 'application/json' }
  });
  return next(cloned);
};
