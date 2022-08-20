import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Contato } from '../classes/contato.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContatoService {

  private endpoint: string = `${environment.apiConnecta}/contatos/telefones`;

  constructor(private _http: HttpClient) {
  }

  getDados(id: number): Observable<Contato> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((contatoResponse: Contato) => {
        return contatoResponse;
      })
    );
  }

  save(payload: Contato): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
