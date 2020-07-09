import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../classes/usuario.class';
import { CadastroUsuario } from './feat/cadastro-usuario';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UsuarioService {

  private _headers: HttpHeaders = new HttpHeaders();

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  cadastrar(login: Usuario): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<CadastroUsuario>>(`${environment.apiUrl}/usuarios`, login,
      { headers: this._headers, observe: 'response' });
  }

}
