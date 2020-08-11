import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Carreira} from '../classes/carreira.class';
import {TokenService} from './token.service';
import {map} from 'rxjs/operators';
import {CarreiraResponseInterface} from './response/carreiraResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CarreiraService {

  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/carreiras`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  getDados(id: number): Observable<Carreira> {
    return this._http.get(`${this.endpoint}/${id}`,
      {
        headers: this._headers
      }).pipe(map((carreira: CarreiraResponseInterface) => {
        return carreira.data;
      })
    );
  }

  save(payload: Carreira): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

}
