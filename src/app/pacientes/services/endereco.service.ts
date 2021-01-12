import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {EnderecoPaciente} from "../classes/endereco-paciente.class";
import {catchError, map} from "rxjs/operators";
import {ResponseTemplateInterface} from "../../services/response/responseTemplate.interface";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private _http: HttpClient) {
  }

  pesquisarEnderecoPorIdPaciente(idPaciente: number): Observable<EnderecoPaciente> {
    return this._http.get(`${environment.apiConnecta}/api/v1/endereco/${idPaciente}`).pipe(
      map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
      catchError(async (err) => console.error(err))
    );
  }

}
