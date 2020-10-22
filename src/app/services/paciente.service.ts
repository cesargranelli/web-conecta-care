import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Documento } from './feat/documento-cpf';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PacienteService {

  constructor(private _http: HttpClient) { }

  pesquisarCpf(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Documento>>(`${environment.apiConnecta}/pacientes/cpf`, documento,
      { observe: 'response' });
  }

}
