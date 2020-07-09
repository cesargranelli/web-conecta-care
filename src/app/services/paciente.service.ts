import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Documento } from './feat/documento-cpf';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PacienteService {

  private _headers: HttpHeaders = new HttpHeaders();

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  pesquisarCpf(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Documento>>(`${environment.apiUrl}/pacientes/cpf`, documento,
      { headers: this._headers, observe: 'response' });
  }

}
