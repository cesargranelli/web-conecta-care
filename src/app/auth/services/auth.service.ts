import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginData } from 'src/app/admin/models/token-admin.model';
import { Login } from 'src/app/classes/login.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpoint: string = `${environment.apiConnecta}`;
  private readonly usuarioNaoCadastrado: string = 'Ops! Você ainda não possui cadastro na plataforma.';
  private readonly usuarioOuSenhaInvalidos: string = 'Ops! Usuário ou senha inválidos.';
  private readonly usuarioNaoCompletouCadastro: string = 'Ops! Usuário pendente de confirmação ou cadastro incompleto.';
  private readonly sistemaIndisponivel: string = 'Ops! Sistema indisponível no momento. Tente novamente em alguns instantes.';

  constructor(
    private _http: HttpClient,
    private _loading: SharedLoadingService,
    private _storeToken: SharedTokenService,
    private _storeValid: SharedValidService
  ) {
  }

  login(user: Login): Observable<boolean> {
    return this._http.post<any>(`${this.endpoint}/login`, user)
      .pipe(
        tap(response => this.storeTokens(response.data)),
        map(response => {
          if(response.status == 200) {
            return true;
          } else {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: response.data?.message,
              showConfirmButton: true
            });
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
  }

  removeTokens(): void {
    this._storeToken.removeToken();
    this._storeValid.removeValid();
  }

  handlerError(httpErrorResponse: HttpErrorResponse): string {
    if (httpErrorResponse.error.status == 401) {
      return this.usuarioOuSenhaInvalidos;
    } else if (httpErrorResponse.error.status == 403) {
      return this.usuarioNaoCadastrado;
    } else if (httpErrorResponse.error.status == 412) {
      return this.usuarioNaoCompletouCadastro;
    } else {
      return this.sistemaIndisponivel;
    }
  }

}
