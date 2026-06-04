import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoPlanoSaudeFilial } from 'src/app/features/health-plan-branches/models/contato-plano-saude-filial.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContatoService {

  private endpoint: string = `${environment.apiConnecta}/planos-saude/{id}/contatos`;

  constructor(private _http: HttpClient) {
  }

  cadastrar(payload: ContatoPlanoSaudeFilial): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint.replace('{id}', payload.idPlanoSaude.toString())}`, payload, {observe: 'response'});
  }

  alterar(payload: ContatoPlanoSaudeFilial): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint.replace('{id}', payload.idPlanoSaude.toString())}`, payload, {observe: 'response'});
  }

  consultar(idPlanoSaude: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint.replace('{id}', idPlanoSaude.toString())}`, {observe: 'response'});
  }

}
