import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Escolaridade } from '../models/escolaridade.class';

@Injectable({ providedIn: 'root' })
export class EscolaridadeService {
  private endpoint = `${environment.apiConnecta}/escolaridade`;

  constructor(private _http: HttpClient) {}

  getDados(id: number): Observable<Escolaridade> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((e: Escolaridade) => e));
  }

  save(payload: Escolaridade): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
}
