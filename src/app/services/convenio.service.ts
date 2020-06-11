import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Documento } from './responses/documento-cnpj';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConvenioService {

  constructor(private http: HttpClient) { }

  pesquisarCnpj(documento: Documento): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<Documento>>(`${environment.apiUrl}/convenios/cnpj`, documento,
      { observe: 'response' });
  }

}
