import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { tap } from 'rxjs/internal/operators/tap';
import { LoginAdmin } from 'src/app/admin/models/login-admin.model';
import { LoginAdminData } from 'src/app/admin/models/token-admin.model';
import { SharedEventTokenService } from 'src/app/shared/services/shared-event-token.service';
import { SharedEventValidService } from 'src/app/shared/services/shared-event-valid.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string = `${environment.apiUrl}`;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly VALID = 'VALID';

  constructor(
    private _http: HttpClient,
    private _loading: SharedLoadingService,
    private _eventToken: SharedEventTokenService,
    private _eventValid: SharedEventValidService
  ) { }

  login(user: LoginAdmin): Observable<boolean> {
    this._loading.emitChange(true);
    return this._http.post<any>(`${this.endpoint}/admin/login`, user)
      .pipe(
        tap(response => this.doLoginUser(user.email, response.data)),
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

  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getValid() {
    return JSON.parse(localStorage.getItem(this.VALID));
  }

  private doLoginUser(email: string, data: LoginAdminData) {
    this.storeTokens(data);
    this._eventToken.emitChange(this.getJwtToken());
    this._eventValid.emitChange(this.getValid());
  }

  private doLogoutUser() {
    this.removeTokens();
    this._eventToken.emitChange(false);
    this._eventValid.emitChange(false);
  }

  private storeTokens(data: LoginAdminData) {
    window.localStorage.setItem(this.JWT_TOKEN, data.token);
    localStorage.setItem(this.VALID, JSON.stringify({id: data.id, email: data.email, role: data.role}));
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.VALID);
  }

}
