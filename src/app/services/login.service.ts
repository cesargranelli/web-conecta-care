import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {EsqueciMinhaSenha as EsqueciMinhaSenha} from '../classes/esqueci-senha';
import {Login} from '../classes/login.class';
import {NovaSenha} from '../classes/nova-senha';
import {ResponseApi} from './feat/response-api';
import {Authorization} from './feat/token';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {

  private _endpoint: string = `${environment.apiConnecta}/login`;

  constructor(private _http: HttpClient) {
  }

  login(login: Login): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}`, login,
      {observe: 'response'});
  }

  esqueciMinhaSenha(esqueciMinhaSenha: EsqueciMinhaSenha): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}/esqueci-minha-senha`, esqueciMinhaSenha,
      {observe: 'response'});
  }

  validaToken(authorization: Authorization): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}/validacao`, authorization,
      {observe: 'response'});
  }

  novaSenha(novaSenha: NovaSenha): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<ResponseApi>>(`${this._endpoint}/nova-senha`, novaSenha,
      {observe: 'response'});
  }

}
