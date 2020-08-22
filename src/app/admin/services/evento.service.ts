import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusEvento } from 'src/app/enums/status-evento.enum';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { Evento } from '../evento/models/evento.class';

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

  cadastrarEvento(payload: Evento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { headers: this._headers, observe: 'response' });
  }

  listarEventos(status: StatusEvento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, status,
      { headers: this._headers, observe: 'response' });
  }

}
