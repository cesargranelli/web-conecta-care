import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginAdminData } from 'src/app/admin/models/token-admin.model';
import { Login } from 'src/app/classes/login.class';
import { SharedEventTokenService } from 'src/app/shared/services/shared-event-token.service';
import { SharedEventValidService } from 'src/app/shared/services/shared-event-valid.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpoint: string = `${environment.apiUrl}`;
  private readonly token = 'token';
  private readonly valid = 'valid';

  constructor(
    private _http: HttpClient,
    private _loading: SharedLoadingService,
    private _eventToken: SharedEventTokenService,
    private _eventValid: SharedEventValidService
  ) { }

  login(user: Login): Observable<boolean> {
    this._loading.emitChange(true);
    return this._http.post<any>(`${this.endpoint}/login`, user)
      .pipe(
        tap(response => this.doLoginUser(response.data)),
        mapTo(true),
        catchError(error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.message,
            showConfirmButton: true
          });
          return of(false);
        })
      );
  }

  logout(): void {
    this.removeTokens();
    this._eventToken.emitChange(false);
    this._eventValid.emitChange(false);
  }

  private doLoginUser(data: LoginAdminData): void {
    this.storeTokens(data);
    this._eventToken.emitChange(data.token);
    this._eventValid.emitChange(JSON.stringify({id: data.id, email: data.email, role: data.role}));
  }

  private storeTokens(data: LoginAdminData): void {
    window.localStorage.setItem(this.token, data.token);
    localStorage.setItem(this.valid, JSON.stringify({id: data.id, email: data.email, role: data.role}));
  }

  private removeTokens(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.valid);
  }

}
