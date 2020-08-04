import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Conta} from '../classes/conta.class';
import {TokenService} from './token.service';
import {ContaResponse} from './response/contaResponse.module';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContaService {

  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/contas`;
  private endpointGetDados: string = `${environment.apiUrl}/contas`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  save(payload: Conta): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

  getDados(id: number): Observable<Conta> {
    return this._http.get(`${this.endpointGetDados}/${id}`,
      {
        headers: this._headers
      }).pipe(map((contaResponse: ContaResponse) => {
        return contaResponse.data;
      })
    );
  }
}

interface teste {
  data: Conta,
  status: number,
  success: boolean
}
