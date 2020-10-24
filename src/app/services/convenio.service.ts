import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../src/environments/environment';
import {Documento} from './feat/documento-cnpj';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConvenioService {

  constructor(private _http: HttpClient) {
  }

  pesquisarCnpj(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Documento>>(`${environment.apiConnecta}/convenios/cnpj`, documento,
      {observe: 'response'});
  }

}
