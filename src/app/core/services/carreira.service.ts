import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Carreira } from '../models/carreira.class';

@Injectable({ providedIn: 'root' })
export class CarreiraService {
  private endpoint = `${environment.apiConnecta}/carreiras`;

  constructor(private _http: HttpClient) {}

  getDados(id: number): Observable<Carreira> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((c: Carreira) => c));
  }

  save(payload: Carreira): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
}
