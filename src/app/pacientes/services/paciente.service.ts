import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Documento} from 'src/app/services/feat/documento';
import {environment} from 'src/environments/environment';
import {map} from "rxjs/operators";
import {ResponseTemplateInterface} from "../../services/response/responseTemplate.interface";
import {Paciente} from "../classes/paciente.class";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private _http: HttpClient) {
  }

  pesquisarByCpf(documento: Documento): Observable<Paciente> {
    return this._http.get(
      `${environment.apiConnecta}/pacientes/cpf`,
      {
        params: new HttpParams().set("documento", documento.numero)
      }
    ).pipe(map((dado: ResponseTemplateInterface) => {
        return dado.data;
      })
    );
  }

  pesquisarById(id: number): Observable<Paciente> {
    return this._http.get(
      `${environment.apiConnecta}/api/v1/paciente/${id}`
    ).pipe(map((dado: ResponseTemplateInterface) => {
        return dado.data;
      })
    );
  }

}
