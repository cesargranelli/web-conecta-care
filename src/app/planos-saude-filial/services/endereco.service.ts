import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoPlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/endereco-plano-saude-filial.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EnderecoService {

  private endpoint: string = `${environment.apiConnecta}/planos-saude/{id}/enderecos`;
  private endpointViaCep: string = `${environment.apiCep}/ws/{cep}/json`;

  constructor(private _http: HttpClient) {
  }

  findViaCep(pathParam: string): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpointViaCep.replace('{cep}', pathParam)}`,
      {observe: 'response'});
  }

  cadastrar(payload: EnderecoPlanoSaudeFilial): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint.replace('{id}', String(payload.idPlanoSaude))}`, payload, {observe: 'response'});
  }

  alterar(payload: EnderecoPlanoSaudeFilial): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint.replace('{id}', String(payload.idPlanoSaude))}`, payload, {observe: 'response'});
  }

  consultar(idPlanoSaude: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint.replace('{id}', idPlanoSaude.toString())}`, {observe: 'response'});
  }

}
