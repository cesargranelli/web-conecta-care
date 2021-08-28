import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ResponseTemplateInterface } from '../../services/response/responseTemplate.interface';
import { Prontuario } from '../classes/prontuario.class';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TratamentoService {
  private endpoint: string = `${environment.apiConnecta}/tratamentos`;

  constructor(private _http: HttpClient) {}

  consultarProntuario(
    idPaciente: number,
    idHomeCare: number
  ): Observable<Prontuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        idPaciente: idPaciente.toString(),
        idHomeCare: idHomeCare.toString(),
      }),
    };
    return this._http
      .get(`${this.endpoint}/prontuario`, {
        headers: httpOptions.headers,
      })
      .pipe(
        map((prontuario: ResponseTemplateInterface) => {
          return prontuario.data;
        }),
        catchError(async (httpResponse: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Falha ao procurar prontuario',
            showConfirmButton: true,
          });
        })
      );
  }
}
