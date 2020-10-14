import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EsqueciMinhaSenha } from 'src/app/classes/esqueci-senha';
import { NovaSenha } from 'src/app/classes/nova-senha';
import { ResponseApi } from 'src/app/services/feat/response-api';
import { Authorization } from 'src/app/services/feat/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {

  private _endpoint: string = `${environment.apiUrl}/login`;

  constructor(private _http: HttpClient) { }

  verLogin(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<ResponseApi>>(`${this._endpoint}/find`, { observe: 'response' });
  }

  esqueciMinhaSenha(esqueciMinhaSenha: EsqueciMinhaSenha): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}/esqueci-minha-senha`, esqueciMinhaSenha,
      { observe: 'response' });
  }

  validaToken(authorization: Authorization): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}/validacao`, authorization,
      { observe: 'response' });
  }

  novaSenha(novaSenha: NovaSenha): Observable<HttpResponse<any>> {
    return this._http.patch<HttpResponse<ResponseApi>>(`${this._endpoint}/nova-senha`, novaSenha,
      { observe: 'response' });
  }

}
