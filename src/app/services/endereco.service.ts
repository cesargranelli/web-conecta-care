import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Endereco } from '../class/endereco.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EnderecoService {

  private endpoint: string = `${environment.apiUrl}/enderecos`;

  constructor(private http: HttpClient) { }

  save(payload: Endereco): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
