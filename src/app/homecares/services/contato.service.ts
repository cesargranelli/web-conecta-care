import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoHomeCare } from 'src/app/classes/contatoHomeCare.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContatoService {

  private endpoint: string = `${environment.apiConnecta}/homecares/{id}/contatos`;

  constructor(private _http: HttpClient) { }

  cadastrar(payload: ContatoHomeCare): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint.replace('{id}', payload.proprietarioId.toString())}`, payload, {observe: 'response'});
  }

  alterar(payload: ContatoHomeCare): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint.replace('{id}', payload.proprietarioId.toString())}`, payload, {observe: 'response'});
  }

  consultar(idHomeCare: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint.replace('{id}', idHomeCare.toString())}`, {observe: 'response'});
  }

}
