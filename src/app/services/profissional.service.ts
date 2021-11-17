import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Profissional } from '../classes/profissional.class';
import { ProfissionalAtendimento } from '../homecares/classes/profissional-atendimento.class';
import { Documento } from './feat/documento';
import { Registro } from './feat/registro';
import { ResponseTemplateInterface } from "./response/responseTemplate.interface";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ProfissionalService {

  private endpoint: string = `${environment.apiConnecta}/profissionais`;

  constructor(private _http: HttpClient) {
  }

  getDados(id: number): Observable<Profissional> {
    return this._http.get(`${this.endpoint}/${id}`)
      .pipe(map((profissionalResponseInterface: ResponseTemplateInterface) => {
        return profissionalResponseInterface.data;
      })
      );
  }

  registrar(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Registro>>(`${this.endpoint}/registrar`, documento,
      { observe: 'response' });
  }

  save(payload: Profissional): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }

  listarEventos(id: number): Observable<any> {
    return this._http.get<any>(`${this.endpoint}/${id}/eventos`, { observe: 'response' });
  }

  confirmarEvento(idProfissional: number, idEvento: number): Observable<any> {
    return this._http.put<any>(`${this.endpoint}/${idProfissional}/eventos/${idEvento}`,
      { observe: 'response' });
  }

  rejeitarEvento(idProfissional: number, idEvento: number): Observable<any> {
    return this._http.delete<any>(`${this.endpoint}/${idProfissional}/eventos/${idEvento}`,
      { observe: 'response' });
  }

  pesquisarPorCpf(cpf: string): Observable<Profissional> {
    return this._http.get(`${this.endpoint}/cpf/${cpf}`)
      .pipe(map((profissional: ResponseTemplateInterface) => {
        return profissional?.data;
      }),
        catchError(async (err) => console.error(err))
      );
  }

  pesquisarPorId(id: string): Observable<ProfissionalAtendimento> {
    return this._http.get(`${this.endpoint}/atendimento`,
      {
        headers: new HttpHeaders().set('profissionais', id)
      }
    ).pipe(map((profissionais: ResponseTemplateInterface) => {
      return profissionais?.data[0];
    }),
      catchError(async (err) => console.error(err))
    );
  }

  consultarProfissionalCompletoPorCpf(cpf: string): Observable<any> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/completo`,
    {
      headers: new HttpHeaders().set('cpf', cpf), observe: 'response'
    });
  }

}
