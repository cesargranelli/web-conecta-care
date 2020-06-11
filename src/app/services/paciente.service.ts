import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Documento } from './responses/documento-cpf';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PacienteService {

  constructor(private http: HttpClient) { }

  pesquisarCpf(documento: Documento): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<Documento>>(`${environment.apiUrl}/pacientes/cpf`, documento,
      { observe: 'response' });
  }

}
