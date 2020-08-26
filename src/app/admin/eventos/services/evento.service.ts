import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/admin/eventos/models/evento.class';
import { StatusEvento } from 'src/app/enums/status-evento.enum';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EventoService {

  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/eventos`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  cadastrar(payload: Evento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { headers: this._headers, observe: 'response' });
  }

  listarFuturos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}`,
      { headers: this._headers, observe: 'response' });
  }

  detalhes(id: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/${id}`,
      { headers: this._headers, observe: 'response' });
  }

  enviar(id: number): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint}/${id}`,
      { headers: this._headers, observe: 'response' });
  }

  cancelar(id: number): Observable<HttpResponse<any>> {
    return this._http.delete<HttpResponse<any>>(`${this.endpoint}/${id}`,
      { headers: this._headers, observe: 'response' });
  }

}
