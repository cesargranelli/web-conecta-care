import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private _http: HttpClient) {
  }
  
  pesquisarEnderecoId(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/endereco/${id}`, {observe: 'response'});
  }
  
}
