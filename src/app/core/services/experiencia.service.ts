import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia.class';

@Injectable({ providedIn: 'root' })
export class ExperienciaService {
  private endpoint = `${environment.apiConnecta}/experiencias`;

  constructor(private _http: HttpClient) {}

  getDados(id: number): Observable<Array<Experiencia>> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((e: Array<Experiencia>) => e));
  }

  save(payload: Experiencia[]): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
}
