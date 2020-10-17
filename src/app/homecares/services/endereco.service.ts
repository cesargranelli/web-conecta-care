import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from 'src/app/classes/endereco.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EnderecoService {

  private endpoint: string = `${environment.apiUrl}/homecares/enderecos`;
  private endpointViaCep: string = `${environment.apiCep}/ws/{cep}/json`;

  constructor(private _http: HttpClient) { }

  findViaCep(pathParam: string): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpointViaCep.replace('{cep}', pathParam)}`,
      { observe: 'response' });
  }

  cadastrar(payload: Endereco): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

  consultar(id: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/${id}`, {observe: 'response'});
  }

}
