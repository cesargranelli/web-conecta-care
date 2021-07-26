import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ContatoPaciente} from '../classes/contato-paciente.class';
import {catchError, map} from 'rxjs/operators';
import {ResponseTemplateInterface} from '../../services/response/responseTemplate.interface';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private _http: HttpClient) {
  }

  consultar(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}/api/v1/contato/${id}`, {observe: 'response'});
  }

  cadastrar(contato: ContatoPaciente): Observable<HttpResponse<any>> {
    return this._http.post(`${environment.apiConnecta}/api/v1/contato`, contato)
      .pipe(map((dado: ResponseTemplateInterface) => {
          return dado.data;
        }),
        catchError(async (err) => console.error(err))
      );
  }

  alterar(contato: ContatoPaciente): Observable<HttpResponse<any>> {
    return this._http.put(`${environment.apiConnecta}/api/v1/contato`, contato)
      .pipe(map((dado: ResponseTemplateInterface) => {
          return dado.data;
        }),
        catchError(async (err) => console.error(err))
      );
  }

}
