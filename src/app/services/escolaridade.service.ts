import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Escolaridade} from '../classes/escolaridade.class';
import {TokenService} from './token.service';
import {map} from 'rxjs/operators';
import {EscolaridadeResponse} from './response/escolaridadeResponse.module';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EscolaridadeService {

  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/escolaridade`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  getDados(id: number): Observable<Escolaridade> {
    return this._http.get(`${this.endpoint}/${id}`,
      {
        headers: this._headers
      }).pipe(map((escolaridade: EscolaridadeResponse) => {
        return escolaridade.data;
      })
    );
  }

  save(payload: Escolaridade): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

}
