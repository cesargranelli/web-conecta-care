import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Complemento } from '../models/complemento.class';

@Injectable({ providedIn: 'root' })
export class ComplementoService {
  private endpoint = `${environment.apiConnecta}/complementos/profissional`;

  constructor(private _http: HttpClient) {}

  getDados(id: number): Observable<Complemento> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((c: Complemento) => c));
  }

  save(payload: Complemento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
}
