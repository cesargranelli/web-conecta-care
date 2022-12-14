import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../classes/usuario.class';
import { CadastroUsuario } from './feat/cadastro-usuario';
import { ConsultaUsuario } from './feat/consulta-usuario';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UsuarioService {
  constructor(private _http: HttpClient) {
  }

  cadastrar(login: Usuario): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<CadastroUsuario>>(`${environment.apiConnecta}/usuarios`, login,
      {observe: 'response'});
  }

  consultar(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<ConsultaUsuario>>(`${environment.apiConnecta}/usuarios`,
      {observe: 'response'});
  }
}
