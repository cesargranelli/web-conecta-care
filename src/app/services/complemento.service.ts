import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Complemento } from '../class/complemento.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ComplementoService {

  private endpoint: string = `${environment.apiUrl}/complementos/profissional`;

  constructor(private http: HttpClient) { }

  save(payload: Complemento): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
