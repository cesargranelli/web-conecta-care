import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/plano-saude-filial.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PlanoSaudeFilialService {

  private endpoint: string = `${environment.apiConnecta}/planos-saude`;

  constructor(private _http: HttpClient) {
  }

  cadastrar(payload: PlanoSaudeFilial): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

  alterar(payload: PlanoSaudeFilial): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

  consultar(id: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/${id}`, {observe: 'response'});
  }

  listarMatriz(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/matriz`, {observe: 'response'});
  }

}
