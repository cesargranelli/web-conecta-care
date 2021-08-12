import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseTemplateInterface } from 'src/app/services/response/responseTemplate.interface';
import { environment } from 'src/environments/environment';
import { HistoricoMedicoPaciente } from '../classes/historico-medico-paciente.class';

@Injectable({
  providedIn: 'root'
})
export class HistoricoMedicoService {

  constructor(private _http: HttpClient) {
  }

  public cadastrar(historicoMedicoPaciente: HistoricoMedicoPaciente) {
    return this._http.post(`${environment.apiConnecta}/api/v1/historico-medico`, historicoMedicoPaciente)
      .pipe(map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
        catchError(async (err) => console.error(err))
      );
  }

  public alterar(historicoMedicoPaciente: HistoricoMedicoPaciente) {
    return this._http.put(`${environment.apiConnecta}/api/v1/historico-medico`, historicoMedicoPaciente)
      .pipe(map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
        catchError(async (err) => console.error(err))
      );
  }

  pesquisarHistoricoMedico(id: number): Observable<HistoricoMedicoPaciente> {
    return this._http.get(`${environment.apiConnecta}/api/v1/historico-medico/${id}`)
      .pipe(map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
        catchError(async (err) => console.error(err))
      );
  }

}
