import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../src/environments/environment';
import {Endereco} from '../classes/endereco.class';
import {EnderecoResponseInterface} from './response/enderecoResponse.interface';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EnderecoService {

  readonly _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/enderecos`;
  private endpointViaCep: string = `${environment.apiCep}/ws/{cep}/json`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  findViaCep(pathParam: string): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpointViaCep.replace('{cep}', pathParam)}`,
      {
        observe: 'response'
      });
  }

  getDados(id: number): Observable<Endereco> {
    return this._http.get(`${this.endpoint}/${id}`,
      {
        headers: this._headers
      }).pipe(map((enderecoResponseInterface: EnderecoResponseInterface) => {
        return enderecoResponseInterface.data;
      })
    );
  }

  save(payload: Endereco): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      {headers: this._headers, observe: 'response'});
  }

}
