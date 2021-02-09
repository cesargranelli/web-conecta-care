import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginData } from 'src/app/admin/models/token-admin.model';
import { Login } from 'src/app/classes/login.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { RoleConverter } from 'src/app/utils/role.converter';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpoint: string = `${environment.apiConnecta}`;
  private converterRole: RoleConverter = new RoleConverter();
  private readonly sistemaIndisponivel: string = 'Ops! Sistema indisponível no momento. Tente novamente em alguns instantes.';

  constructor(
    private _http: HttpClient,
    private _loading: SharedLoadingService,
    private _storeToken: SharedTokenService,
    private _storeValid: SharedValidService
  ) {
  }

  login(user: Login): Observable<boolean> {
    // this._loading.emitChange(true);
    return this._http.post<any>(`${this.endpoint}/login`, user)
      .pipe(
        tap(response => this.storeTokens(response.data)),
        map(response => {
          if(response.status == 200) {
            // this._loading.emitChange(false);
            return true;
          } else {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: response.data?.message,
              showConfirmButton: true
            });
            // this._loading.emitChange(false);
            return false;
          }
        }),
        catchError((httpResponse: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: this.handlerError(httpResponse),
            showConfirmButton: true
          });
          this._loading.emitChange(false);
          return of(false);
        })
      );
  }

  storeTokens(data: LoginData): void {
    this._storeToken.setToken(data.token);
    this._storeValid.setValid({id: data?.id, email: data?.email, role: this.converterRole.getRole(data?.role)});
  }

  removeTokens(): void {
    this._storeToken.removeToken();
    this._storeValid.removeValid();
  }

  handlerError(httpErrorResponse: HttpErrorResponse): string {
    return httpErrorResponse.error.data?.message ? httpErrorResponse.error.data?.message : this.sistemaIndisponivel;
  }

}
