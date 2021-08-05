import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseTemplateInterface } from '../../services/response/responseTemplate.interface';
import { EnderecoPaciente } from '../classes/endereco-paciente.class';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly ID_PACIENTE: string = 'idPaciente';

  constructor(private _http: HttpClient) {
  }

  public cadastrar(enderecoPaciente: EnderecoPaciente) {
    return this._http.post(`${environment.apiConnecta}/api/v1/endereco`, enderecoPaciente)
      .pipe(map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
        catchError(async (err) => console.error(err))
      );
  }

  public alterar(enderecoPaciente: EnderecoPaciente) {
    return this._http.put(`${environment.apiConnecta}/api/v1/endereco`, enderecoPaciente)
      .pipe(map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
        catchError(async (err) => console.error(err))
      );
  }


  public pesquisarEnderecoPorId(id: number): Observable<EnderecoPaciente> {
    return this._http.get(`${environment.apiConnecta}/api/v1/endereco/${id}`).pipe(
      map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
      catchError(async (err) => console.error(err))
    );
  }

  public pesquisarEnderecoPorIdPaciente(idPaciente: number): Observable<EnderecoPaciente> {
    return this._http.get(
      `${environment.apiConnecta}/api/v1/endereco`,
      { params: new HttpParams().set(this.ID_PACIENTE, String(idPaciente)) }
    ).pipe(
      map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
      catchError(async (err) => console.error(err))
    );
  }

}
