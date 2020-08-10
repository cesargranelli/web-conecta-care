import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Complemento} from '../classes/complemento.class';
import {TokenService} from './token.service';
import {map} from 'rxjs/operators';
import {ComplementoResponseInterface} from './response/complementoResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ComplementoService {

  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/complementos/profissional`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  getDados(id: number): Observable<Complemento> {
    return this._http.get(`${this.endpoint}/${id}`,
      {
        headers: this._headers
      }).pipe(map((complemento: ComplementoResponseInterface) => {
        return complemento.data;
      })
    );
  }

  save(payload: Complemento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

}
