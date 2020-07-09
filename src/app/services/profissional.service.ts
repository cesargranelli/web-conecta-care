import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Profissional } from '../classes/profissional.class';
import { Documento } from './feat/documento';
import { DoumentoService } from './interfaces/documento-interface.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ProfissionalService implements DoumentoService {

  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/profissionais`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  pesquisar(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Documento>>(`${environment.apiUrl}/profissionais/cpf`, documento,
      { observe: 'response' });
  }

  save(payload: Profissional): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { headers: this._headers, observe: 'response' });
  }

}
