import {
  HttpClient,

  HttpHeaders,

  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { ResponseTemplateInterface } from 'src/app/services/response/responseTemplate.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class PacienteService {
  private endpoint: string = `${environment.apiConnecta}/api/v1/paciente`;

  constructor(private _http: HttpClient) { }

  consultarPorNome(nome: string): Observable<Paciente> {
    return this._http
      .get(`${this.endpoint}`, {
        params: new HttpParams().set('nome', nome),
      })
      .pipe(
        map((paciente: ResponseTemplateInterface) => {
          return this.avaliaPaciente(paciente);
        }));
  }

  consultarPorDocumento(documento: string): Observable<Paciente> {
    return this._http
      .get(`${this.endpoint}`, {
        params: new HttpParams().set('documento', documento),
      })
      .pipe(
        map((paciente: ResponseTemplateInterface) => {
          return this.avaliaPaciente(paciente);
        }));
  }

  avaliaPaciente(paciente: ResponseTemplateInterface) {
    if (paciente) {
      return paciente.data;
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Paciente não possui cadastro ou cadastro incompleto!',
        showConfirmButton: true,
      });
      return null;
    }
  }

  consultarPacientePorCpf(cpf: string): Observable<any> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/cpf`,
    {
      headers: new HttpHeaders().set('cpf', cpf), observe: 'response'
    });
  }

}
