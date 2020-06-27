import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Documento } from './feat/documento-cpf';
import { Profissional } from '../class/profissional.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ProfissionalService {

  private endpoint: string = `${environment.apiUrl}/profissionais`;

  constructor(private http: HttpClient) {

  }

  pesquisarCpf(documento: Documento): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<Documento>>(`${environment.apiUrl}/profissionais/cpf`, documento,
      { observe: 'response' });
  }

  save(payload: Profissional): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
