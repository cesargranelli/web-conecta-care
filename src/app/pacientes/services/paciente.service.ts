import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from 'src/app/services/feat/documento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private _http: HttpClient) {
  }

  pesquisarCpf(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Documento>>(`${environment.apiConnecta}/pacientes/cpf`, documento,
      {observe: 'response'});
  }

  pesquisarById(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/paciente/${id}`, {observe: 'response'});
  }



}
