import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Profissional} from '../classes/profissional.class';
import {Documento} from './feat/documento';
import {Registro} from './feat/registro';
import {DoumentoService} from './interfaces/documento-interface.service';
import {TokenService} from './token.service';
import {map} from 'rxjs/operators';
import {ProfissionalResponseInterface} from './response/profissionalResponse.interface';

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

  getDados(id: number): Observable<Profissional> {
    return this._http.get(`${this.endpoint}/${id}`,
      {
        headers: this._headers
      }).pipe(map((profissionalResponseInterface: ProfissionalResponseInterface) => {
        return profissionalResponseInterface.data;
      })
    );
  }

  registrar(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Registro>>(`${environment.apiUrl}/profissionais/registrar`, documento,
      {observe: 'response'});
  }

  save(payload: Profissional): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

}
