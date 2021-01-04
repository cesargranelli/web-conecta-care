import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../src/environments/environment';
import {Documento} from './feat/documento-cpf';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PacienteService {

  constructor(private _http: HttpClient) {
  }

  pesquisarCpf(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Documento>>(`${environment.apiConnecta}/pacientes/cpf`, documento,
      {observe: 'response'});
  }

  pesquisarPacienteId(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/paciente/${id}`, {observe: 'response'});
  }

  pesquisarContatoId(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/contato/${id}`, {observe: 'response'});
  }

  pesquisarEnderecoId(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/endereco/${id}`, {observe: 'response'});
  }

  pesquisarHistoricoMedico(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/historico-medico/${id}`, {observe: 'response'});
  }

  listarEstadoCivil(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/estado-civil`, {observe: 'response'});
  }

  listarEstado(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/estado`, {observe: 'response'});
  }

  listarGenero(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/genero`, {observe: 'response'});
  }

  listarTipoSanguineo(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/tipo-sanguineo`, {observe: 'response'});
  }

}
