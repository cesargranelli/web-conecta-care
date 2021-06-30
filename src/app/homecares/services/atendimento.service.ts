import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AtendimentoService {

  private endpoint: string = `${environment.apiConnecta}/atendimentos`;

  constructor(private _http: HttpClient) {
  }

  consultar(idHomeCare: number): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        idHomeCare: idHomeCare.toString()
      })
    };

    return this._http.get<HttpResponse<any>>(`${this.endpoint.concat('/resumo')}`, {
      headers: httpOptions.headers,
      observe: 'response'
    });
  }

}
