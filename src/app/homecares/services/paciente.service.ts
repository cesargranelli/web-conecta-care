import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { ResponseTemplateInterface } from 'src/app/services/response/responseTemplate.interface';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class PacienteService {
  private endpoint: string = `${environment.apiConnecta}/api/v1/paciente`;

  constructor(
    private _http: HttpClient,
    private loadingService: SharedLoadingService
  ) {}

  consultarPorNome(nome: string): Observable<Paciente> {
    return this._http
      .get(`${this.endpoint}`, {
        params: new HttpParams().set('nome', nome),
      })
      .pipe(
        map((paciente: ResponseTemplateInterface) => {
          return paciente.data;
        }),
        catchError(async (httpResponse: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Falha ao buscar paciente',
            showConfirmButton: true,
          });
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
        }),
        catchError(async (httpResponse: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Falha ao buscar paciente',
            showConfirmButton: true,
          });
          this.loadingService.emitChange(false);
        })
      );
  }

  avaliaPaciente(paciente: ResponseTemplateInterface) {
    if (paciente) {
      return paciente.data;
    } else {
      return null;
    }
  }
}
