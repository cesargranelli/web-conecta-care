import { HttpClient, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CadastroUsuario } from './feat/cadastro-usuario';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CadastroService {

  constructor(private http: HttpClient) { }

  validar(token: Token): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<CadastroUsuario>>(`${environment.apiUrl}/usuarios/validacao`, token,
      { observe: 'response' });
  }

}
