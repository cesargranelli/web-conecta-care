import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoHomeCare } from 'src/app/homecares/classes/endereco-homecare.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EnderecoService {

  private endpoint: string = `${environment.apiConnecta}/homecares/{id}/enderecos`;
  private endpointViaCep: string = `${environment.apiCep}/ws/{cep}/json`;

  constructor(private _http: HttpClient) {
  }

  findViaCep(pathParam: string): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpointViaCep.replace('{cep}', pathParam)}`,
      {observe: 'response'});
  }

  cadastrar(payload: EnderecoHomeCare): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint.replace('{id}', String(payload.idHomeCare))}`, payload, {observe: 'response'});
  }

  alterar(payload: EnderecoHomeCare): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint.replace('{id}', String(payload.idHomeCare))}`, payload, {observe: 'response'});
  }

  consultar(idHomeCare: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint.replace('{id}', idHomeCare.toString())}`, {observe: 'response'});
  }

}
