import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Experiencia} from '../classes/experiencia.class';
import {TokenService} from './token.service';
import {map} from 'rxjs/operators';
import {ExperienciaResponseInterface} from './response/experienciaResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ExperienciaService {

  readonly _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/experiencias`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  getDados(id: number): Observable<Array<Experiencia>> {
    return this._http.get(`${this.endpoint}/${id}`,
      {
        headers: this._headers
      }).pipe(map((experiencias: ExperienciaResponseInterface) => {
        return experiencias.data;
      })
    );
  }

  save(payload: Experiencia[]): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

}
