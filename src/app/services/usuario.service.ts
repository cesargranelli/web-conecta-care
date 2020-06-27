import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../class/login.class';
import { CadastroUsuario } from './feat/cadastro-usuario';

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
