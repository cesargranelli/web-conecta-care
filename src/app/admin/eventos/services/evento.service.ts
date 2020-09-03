import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/admin/eventos/models/evento.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EventoService {

  private endpoint: string = `${environment.apiUrl}/eventos`;

  constructor(private _http: HttpClient) { }

  cadastrar(payload: Evento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

  listarFuturos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}`,
      { observe: 'response' });
  }

  detalhes(id: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/${id}`,
      { observe: 'response' });
  }

  enviar(id: number): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint}/${id}`,
      { observe: 'response' });
  }

  cancelar(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<HttpResponse<any>>(`${this.endpoint}/${id}`,
      { observe: 'response' });
  }

}
