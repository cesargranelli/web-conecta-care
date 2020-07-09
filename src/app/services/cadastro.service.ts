import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CadastroUsuario } from './feat/cadastro-usuario';
import { Authorization } from './feat/token';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CadastroService {

  private _headers: HttpHeaders = new HttpHeaders();

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  validar(authorization: Authorization): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<CadastroUsuario>>(`${environment.apiUrl}/usuarios/validacao`, authorization,
      { headers: this._headers, observe: 'response' });
  }

}
