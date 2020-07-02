import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Conta } from '../class/conta.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContaService {

  private endpoint: string = `${environment.apiUrl}/contas`;

  constructor(private http: HttpClient) { }

  save(payload: Conta): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
