import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../classes/login.class';
import { Documento } from './responses/documento-cpf';
import { CadastroUsuario } from './responses/cadastro-usuario';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {

  }

  cadastrar(login: Login): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<CadastroUsuario>>(`${environment.apiUrl}/usuarios`, login,
      { observe: 'response' });
  }

}
