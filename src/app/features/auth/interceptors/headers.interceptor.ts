import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Don't override Content-Type for multipart/form-data (file uploads)
  if (req.body instanceof FormData) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { 'Content-Type': 'application/json' } }));
};
