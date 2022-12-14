import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Conta } from '../classes/conta.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContaService {

  private endpoint: string = `${environment.apiConnecta}/contas`;
  private endpointGetDados: string = `${environment.apiConnecta}/contas`;

  constructor(private _http: HttpClient) {
  }

  getDados(id: number): Observable<Conta> {
    return this._http.get(`${this.endpointGetDados}/${id}`).pipe(map((contaResponse: Conta) => {
        return contaResponse;
      })
    );
  }

  save(payload: Conta): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
