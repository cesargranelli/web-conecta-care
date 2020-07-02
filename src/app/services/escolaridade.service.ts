import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Escolaridade } from '../class/escolaridade.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EscolaridadeService {

  private endpoint: string = `${environment.apiUrl}/escolaridade`;

  constructor(private http: HttpClient) { }

  save(payload: Escolaridade): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
