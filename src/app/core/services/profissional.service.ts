import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profissional } from '../models/profissional.class';
import { ProfissionalAtendimento } from 'src/app/features/homecares/models/profissional-atendimento.model';
import { Documento } from '../models/documento';
import { Registro } from '../models/registro';

@Injectable({ providedIn: 'root' })
export class ProfissionalService {
  private endpoint = `${environment.apiConnecta}/profissionais`;

  constructor(private _http: HttpClient) {}

  getDados(id: number): Observable<Profissional> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((p: Profissional) => p));
  }

  registrar(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Registro>>(
      `${this.endpoint}/registrar`, documento, { observe: 'response' }
    );
  }

  save(payload: Profissional): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }

  listarEventos(id: number): Observable<any> {
    return this._http.get<any>(`${this.endpoint}/${id}/eventos`, { observe: 'response' });
  }

  confirmarEvento(idProfissional: number, idEvento: number): Observable<any> {
    return this._http.put<any>(`${this.endpoint}/${idProfissional}/eventos/${idEvento}`, null, { observe: 'response' });
  }

  rejeitarEvento(idProfissional: number, idEvento: number): Observable<any> {
    return this._http.delete<any>(`${this.endpoint}/${idProfissional}/eventos/${idEvento}`, { observe: 'response' });
  }

  pesquisarPorCpf(cpf: string): Observable<Profissional> {
    return this._http.get(`${this.endpoint}/cpf/${cpf}`).pipe(
      map((p: any) => p),
      catchError(async (err) => console.error(err))
    );
  }

  pesquisarPorId(id: string): Observable<ProfissionalAtendimento> {
    return this._http.get(`${this.endpoint}/atendimento`, {
      headers: new HttpHeaders().set('profissionais', id)
    }).pipe(
      map((profissionais: any) => profissionais[0]),
      catchError(async (err) => console.error(err))
    );
  }

  consultarProfissionalCompletoPorCpf(cpf: string): Observable<any> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/completo`, {
      headers: new HttpHeaders().set('cpf', cpf), observe: 'response'
    });
  }

  consultarProfissionalPorNome(nome: string): Observable<any> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/nome`, {
      headers: new HttpHeaders().set('nome', nome), observe: 'response'
    });
  }
}
