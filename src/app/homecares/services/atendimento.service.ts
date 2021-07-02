import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {ResponseTemplateInterface} from '../../services/response/responseTemplate.interface';
import {AtendimentoDetalhes} from '../classes/atendimento-detalhes.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AtendimentoService {

  private endpoint: string = `${environment.apiConnecta}/atendimentos`;

  constructor(private _http: HttpClient) {
  }

  consultarResumo(idHomeCare: number): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        idHomeCare: '1'
      })
    };

    return this._http.get<HttpResponse<any>>(`${this.endpoint.concat('/resumo')}`, {
      headers: httpOptions.headers,
      observe: 'response'
    });
  }

  consultarDetalhes(): Observable<AtendimentoDetalhes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        idAtendimento: '1'
      })
    };
    return this._http.get(`${this.endpoint}`, {
      headers: httpOptions.headers
    }).pipe(
      map((atendimentoDetalhes: ResponseTemplateInterface) => {
        return atendimentoDetalhes.data;
      })
    );
  }

}
