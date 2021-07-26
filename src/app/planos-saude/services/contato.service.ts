import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoPlanoSaude } from 'src/app/planos-saude/classes/contato-plano-saude.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContatoService {

  private endpoint = `${environment.apiConnecta}/planos-saude/{id}/contatos`;

  constructor(private _http: HttpClient) {
  }

  cadastrar(payload: ContatoPlanoSaude): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint.replace('{id}', payload.idPlanoSaude.toString())}`, payload, {observe: 'response'});
  }

  alterar(payload: ContatoPlanoSaude): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint.replace('{id}', payload.idPlanoSaude.toString())}`, payload, {observe: 'response'});
  }

  consultar(idPlanoSaude: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint.replace('{id}', idPlanoSaude.toString())}`, {observe: 'response'});
  }

}
