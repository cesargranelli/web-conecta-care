import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Prontuario } from '../classes/prontuario.class';
import { TratamentoAbertoLista } from '../classes/tratamento-aberto-lista.class';
import { TratamentoAdicionar } from '../classes/tratamento-adicionar.class';
import { TratamentoEncerrar } from '../classes/tratamento-encerrar.class';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TratamentoService {
  private endpoint: string = `${environment.apiConnecta}/tratamentos`;

  constructor(
    private _http: HttpClient,
    private loadingService: SharedLoadingService
  ) { }

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
        map((prontuario: any) => {
          return prontuario;
        }),
        catchError(async (httpResponse: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Falha ao procurar prontuario',
            showConfirmButton: true,
          });
          this.loadingService.emitChange(false);
        })
      );
  }

  adicionarTratamento(payload: TratamentoAdicionar): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }

  consultarTratamentoEmAberto(pacienteId: string, homeCareId: string): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        pacienteId: pacienteId,
        homeCareId: homeCareId,
      }),
    };

    return this._http.get<HttpResponse<any>>(`${this.endpoint}/aberto/paciente`, {
      headers: httpOptions.headers, observe: 'response'
    });
  }

  listarTratamentoEmAberto(homeCareId: string): Observable<TratamentoAbertoLista[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        homeCareId: homeCareId,
      }),
    };

    return this._http.get(`${this.endpoint}/aberto`, {
      headers: httpOptions.headers
    }).pipe(
      map((tratamentoEmAberto: any) => {
        return tratamentoEmAberto;
      }),
      catchError(async (httpResponse: HttpErrorResponse) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Falha ao procurar lista de tratamentos em aberto',
          showConfirmButton: true,
        });
        this.loadingService.emitChange(false);
      })
    );

  }

  encerrarTratamento(payload: TratamentoEncerrar): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint}/encerramento`, payload, { observe: 'response' });
  }

}
