import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EsqueciMinhaSenha } from 'src/app/classes/esqueci-senha';
import { NovaSenha } from 'src/app/classes/nova-senha';
import { ResponseApi } from 'src/app/services/feat/response-api';
import { Authorization } from 'src/app/services/feat/token';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {

  private _headers: HttpHeaders = new HttpHeaders();

  private _endpoint: string = `${environment.apiUrl}/login`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  verLogin(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<ResponseApi>>(`${this._endpoint}/find`,
      { headers: this._headers, observe: 'response' });
  }

  esqueciMinhaSenha(esqueciMinhaSenha: EsqueciMinhaSenha): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}/esqueci-minha-senha`, esqueciMinhaSenha,
      { headers: this._headers, observe: 'response' });
  }

  validaToken(authorization: Authorization): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}/validacao`, authorization,
      { headers: this._headers, observe: 'response' });
  }

  novaSenha(novaSenha: NovaSenha): Observable<HttpResponse<any>> {
    return this._http.patch<HttpResponse<ResponseApi>>(`${this._endpoint}/nova-senha`, novaSenha,
      { headers: this._headers, observe: 'response' });
  }

}
