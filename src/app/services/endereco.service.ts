import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment';
import { Endereco } from '../classes/endereco.class';
import { EnderecoResponseInterface } from './response/enderecoResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EnderecoService {

  private endpoint: string = `${environment.apiUrl}/enderecos`;
  private endpointViaCep: string = `${environment.apiCep}/ws/{cep}/json`;

  constructor(private _http: HttpClient) { }

  findViaCep(pathParam: string): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpointViaCep.replace('{cep}', pathParam)}`,
      { observe: 'response' });
  }

  getDados(id: number): Observable<Endereco> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((enderecoResponseInterface: EnderecoResponseInterface) => {
        return enderecoResponseInterface.data;
      })
    );
  }

  save(payload: Endereco): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
