import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {ResponseTemplateInterface} from '../../services/response/responseTemplate.interface';
import {AtendimentoDetalhes} from '../classes/atendimento-detalhes.class';
import { AtendimentoAdicionar } from '../classes/atendimento-adicionar.class';

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
        idHomeCare: String(idHomeCare)
      })
    };

    return this._http.get<HttpResponse<any>>(`${this.endpoint.concat('/resumo')}`, {
      headers: httpOptions.headers,
      observe: 'response'
    });
  }

  consultarDetalhes(idAtendimento: number): Observable<AtendimentoDetalhes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(`${this.endpoint}/${idAtendimento}`, {
      headers: httpOptions.headers
    }).pipe(
      map((atendimentoDetalhes: any) => {
        return atendimentoDetalhes;
      })
    );
  }

  adicionarTratamento(payload: AtendimentoAdicionar): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, { observe: 'response' });
  }

  consultarPreview(cpfProfissional: string | null, cpfPaciente: string | null, 
    periodoDe: string | null, periodoAte: string | null, 
    areaAtendimento: string | null, statusAtendimento: string | null,
    homeCare: string): Observable<HttpResponse<any>> {
    
    console.log('consultarPreview -> ' + homeCare);
    let cpfProfissionalFilter = cpfProfissional ? cpfProfissional : ' ';
    let cpfPacienteFilter = cpfPaciente ? cpfPaciente : ' ';
    let areaAtendimentoFilter = areaAtendimento ? areaAtendimento : ' ';
    let statusAtendimentoFilter = statusAtendimento ? statusAtendimento : ' ';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        cpfProfissional: String(cpfProfissionalFilter),
        cpfPaciente: String(cpfPacienteFilter),
        areaAtendimentoId: String(areaAtendimentoFilter),
        statusAtendimentoId: String(statusAtendimentoFilter),
        homeCareId: String(homeCare),
        periodoDe: String(periodoDe),
        periodoAte: String(periodoAte)
      })
    };

    return this._http.get<HttpResponse<any>>(`${this.endpoint.concat('/preview')}`, {
      headers: httpOptions.headers,
      observe: 'response'
    });

  }

  downloadFile(cpfProfissional: string | null, cpfPaciente: string | null, 
    periodoDe: string | null, periodoAte: string | null, 
    areaAtendimento: string | null, statusAtendimento: string | null,
    homeCare: string, gerarPara: string): Observable<Blob> {
    
    let cpfProfissionalFilter = cpfProfissional ? cpfProfissional : ' ';
    let cpfPacienteFilter = cpfPaciente ? cpfPaciente : ' ';
    let areaAtendimentoFilter = areaAtendimento ? areaAtendimento : ' ';
    let statusAtendimentoFilter = statusAtendimento ? statusAtendimento : ' ';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        cpfProfissional: String(cpfProfissionalFilter),
        cpfPaciente: String(cpfPacienteFilter),
        areaAtendimentoId: String(areaAtendimentoFilter),
        statusAtendimentoId: String(statusAtendimentoFilter),
        homeCareId: String(homeCare),
        periodoDe: String(periodoDe),
        periodoAte: String(periodoAte),
        gerarPara: String(gerarPara)
      })
    };

    return this._http.get(`${this.endpoint.concat('/preview/file')}`, { 
        headers: httpOptions.headers,
        responseType: 'blob'
      },
     )
  }
  
}
