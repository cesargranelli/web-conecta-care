import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Conta } from '../models/conta.class';

@Injectable({ providedIn: 'root' })
export class ContaService {
  private endpoint = `${environment.apiConnecta}/contas`;

  constructor(private _http: HttpClient) {}

  getDados(id: number): Observable<Conta> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((c: Conta) => c));
  }

  save(payload: Conta): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
}
