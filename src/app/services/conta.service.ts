import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Conta } from '../classes/conta.class';
import { ContaResponseInterface } from './response/contaResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContaService {

  private endpoint: string = `${environment.apiUrl}/contas`;
  private endpointGetDados: string = `${environment.apiUrl}/contas`;

  constructor(private _http: HttpClient) { }

  getDados(id: number): Observable<Conta> {
    return this._http.get(`${this.endpointGetDados}/${id}`).pipe(map((contaResponse: ContaResponseInterface) => {
        return contaResponse.data;
      })
    );
  }

  save(payload: Conta): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
