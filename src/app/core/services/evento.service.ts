import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/features/admin/events/models/evento.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private endpoint = `${environment.apiConnecta}/eventos`;

  constructor(private _http: HttpClient) {}

  cadastrar(payload: Evento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }
  listarFuturos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}`, { observe: 'response' });
  }
  detalhes(id: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/${id}`, { observe: 'response' });
  }
  enviar(id: number): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint}/${id}`, null, { observe: 'response' });
  }
  cancelar(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<HttpResponse<any>>(`${this.endpoint}/${id}`, { observe: 'response' });
  }
}
