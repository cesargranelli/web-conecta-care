import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CadastroUsuario } from './feat/cadastro-usuario';
import { Authorization } from './feat/token';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CadastroService {
  constructor(private _http: HttpClient) { }

  validar(authorization: Authorization): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<CadastroUsuario>>(`${environment.apiUrl}/usuarios/validacao`, authorization,
      { observe: 'response' });
  }
}
