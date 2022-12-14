import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public _tokenService: SharedTokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._tokenService.getToken() && request.url.includes(environment.apiConnecta)) {
      request = this.addToken(request, this._tokenService.getToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        return throwError(error);
      }
    }));
  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
