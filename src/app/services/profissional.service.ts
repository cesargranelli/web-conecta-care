import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Profissional } from '../classes/profissional.class';
import { Documento } from './feat/documento';
import { Registro } from './feat/registro';
import { ProfissionalResponseInterface } from './response/profissionalResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ProfissionalService {

  private endpoint: string = `${environment.apiUrl}/profissionais`;

  constructor(private _http: HttpClient) { }

  getDados(id: number): Observable<Profissional> {
    return this._http.get(`${this.endpoint}/${id}`)
      .pipe(map((profissionalResponseInterface: ProfissionalResponseInterface) => {
        return profissionalResponseInterface.data;
      })
    );
  }

  registrar(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Registro>>(`${environment.apiUrl}/profissionais/registrar`, documento,
      {observe: 'response'});
  }

  save(payload: Profissional): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

  listarEventos(id: number): Observable<any> {
    return this._http.get<any>(`${this.endpoint}/${id}/eventos`, {observe: 'response'});
  }

  confirmarEvento(idProfissional: number, idEvento: number): Observable<any> {
    return this._http.put<any>(`${this.endpoint}/${idProfissional}/eventos/${idEvento}`,
      {observe: 'response'});
  }

  rejeitarEvento(idProfissional: number, idEvento: number): Observable<any> {
    return this._http.delete<any>(`${this.endpoint}/${idProfissional}/eventos/${idEvento}`,
      {observe: 'response'});
  }
}
