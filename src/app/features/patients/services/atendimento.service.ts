import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private endpoint: string = `${environment.apiConnecta}/atendimentos`;

  constructor(private _http: HttpClient) {
  }

  public atendimentosProtocolo(pacienteId: string, dataConsulta: string): Observable<HttpResponse<any>> {
    return this._http.get(`${this.endpoint}/paciente`, {
      headers: {
        'pacienteId': pacienteId,
        'dataConsulta': dataConsulta
      },
      observe: 'response'
    });
  }

}
