import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Endereco } from '../models/endereco.class';

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  private endpoint = `${environment.apiConnecta}/enderecos`;
  private endpointViaCep = `${environment.apiCep}/ws/{cep}/json`;

  constructor(private _http: HttpClient) {}

  findViaCep(cep: string): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(this.endpointViaCep.replace('{cep}', cep), { observe: 'response' });
  }

  getDados(id: number): Observable<Endereco> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((e: Endereco) => e));
  }

  save(payload: Endereco): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
}
