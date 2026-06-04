import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contato } from '../models/contato.class';

@Injectable({ providedIn: 'root' })
export class ContatoService {
  private endpoint = `${environment.apiConnecta}/contatos/telefones`;

  constructor(private _http: HttpClient) {}

  getDados(id: number): Observable<Contato> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((c: Contato) => c));
  }

  save(payload: Contato): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
}
