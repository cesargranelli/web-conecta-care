import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Contato} from '../classes/contato.class';
import {TokenService} from './token.service';
import {map} from 'rxjs/operators';
import {ContatoResponseInterface} from './response/contatoResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContatoService {

  readonly _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/contatos/telefones`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  getDados(id: number): Observable<Contato> {
    return this._http.get(`${this.endpoint}/${id}`,
      {
        headers: this._headers
      }).pipe(map((contatoResponse: ContatoResponseInterface) => {
        return contatoResponse.data;
      })
    );
  }

  save(payload: Contato): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

}
