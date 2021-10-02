import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Documento } from 'src/app/services/feat/documento';
import { environment } from 'src/environments/environment';
import { ResponseTemplateInterface } from '../../services/response/responseTemplate.interface';
import { Paciente } from '../classes/paciente.class';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private readonly DOCUMENTO: string = 'documento';

  constructor(private _http: HttpClient) {
  }

  registrar(paciente: Paciente): Observable<any> {
    return this._http.post(
      `${environment.apiConnecta}/api/v1/paciente`,
      paciente
    ).pipe(map((dado: ResponseTemplateInterface) => {
      return dado?.data;
    }),
      catchError(async (err) => console.error(err))
    );
  }

  alterar(paciente: Paciente): Observable<any> {
    return this._http.put(
      `${environment.apiConnecta}/api/v1/paciente`,
      paciente
    ).pipe(map((dado: ResponseTemplateInterface) => {
      return dado?.data;
    }),
      catchError(async (err) => console.error(err))
    );
  }

  pesquisarPorCpf(documento: Documento): Observable<Paciente> {
    return this._http.get(
      `${environment.apiConnecta}/api/v1/paciente`,
      {
        params: new HttpParams().set(this.DOCUMENTO, documento.numero)
      }
    ).pipe(map((dado: ResponseTemplateInterface) => {
      return dado?.data;
    }),
      catchError(async (err) => console.error(err))
    );
  }

  pesquisarPorId(id: number): Observable<Paciente> {
    return this._http.get(
      `${environment.apiConnecta}/api/v1/paciente/${id}`
    ).pipe(
      map((dado: ResponseTemplateInterface) => {
        return dado?.data;
      }),
      catchError(async (err) => console.error(err))
    );
  }

}
