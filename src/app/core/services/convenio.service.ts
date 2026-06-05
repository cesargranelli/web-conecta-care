import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface DocumentoCnpj { cnpj: string; }

@Injectable({ providedIn: 'root' })
export class ConvenioService {
  constructor(private _http: HttpClient) {}

  pesquisarCnpj(documento: DocumentoCnpj): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<DocumentoCnpj>>(
      `${environment.apiConnecta}/convenios/cnpj`, documento, { observe: 'response' }
    );
  }
}
