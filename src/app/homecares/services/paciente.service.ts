import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { ResponseTemplateInterface } from 'src/app/services/response/responseTemplate.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class PacienteService {
  private endpoint: string = `${environment.apiConnecta}/api/v1/paciente`;

  constructor(private _http: HttpClient) {}

  consultarPorNome(nome: string): Observable<Paciente> {
    return this._http
      .get(`${this.endpoint}`, {
        params: new HttpParams().set('nome', nome),
      })
      .pipe(
        map((paciente: ResponseTemplateInterface) => {
          return paciente.data;
        })
      );
  }

  consultarPorDocumento(documento: string): Observable<Paciente> {
    return this._http
      .get(`${this.endpoint}`, {
        params: new HttpParams().set('documento', documento),
      })
      .pipe(
        map((paciente: ResponseTemplateInterface) => {
          return paciente.data;
        })
      );
  }
}
