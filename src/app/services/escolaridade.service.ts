import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Escolaridade } from '../classes/escolaridade.class';
import { EscolaridadeResponse } from './response/escolaridadeResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EscolaridadeService {

  private endpoint: string = `${environment.apiUrl}/escolaridade`;

  constructor(private _http: HttpClient) { }

  getDados(id: number): Observable<Escolaridade> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((escolaridade: EscolaridadeResponse) => {
        return escolaridade.data;
      })
    );
  }

  save(payload: Escolaridade): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
