import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AreaAtendimento } from '../models/area-atendimento.class';
import { Banco } from '../models/banco.class';
import { CategoriaCNH } from '../models/categoria-cnh.class';
import { Conselho } from '../models/conselho.class';
import { EstadoCivil } from '../models/estado-civil.class';
import { Estado } from '../models/estado.class';
import { Genero } from '../models/genero.class';
import { Grupo } from '../models/grupo.class';
import { Instrucao } from '../models/instrucao.class';
import { Modelo } from '../models/modelo.class';
import { Pais } from '../models/pais.class';
import { Parentesco } from '../models/parentesco.class';
import { TipoConta } from '../models/tipo-conta.class';
import { TipoEmpresa } from '../models/tipo-empresa.class';
import { Transporte } from '../models/transporte.class';
import { StatusAtendimento } from '../models/status-atendimento.class';

@Injectable({ providedIn: 'root' })
export class DominioService {
  private endpoint = `${environment.apiConnecta}/dominio`;

  constructor(private _http: HttpClient) {}

  getGeneros(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Genero[]>>(`${this.endpoint}/genero`, { observe: 'response' });
  }
  getTipoEmpresas(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<TipoEmpresa[]>>(`${this.endpoint}/tipo-empresa`, { observe: 'response' });
  }
  getEstadoCivis(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<EstadoCivil[]>>(`${this.endpoint}/estado-civil`, { observe: 'response' });
  }
  getEstados(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Estado[]>>(`${this.endpoint}/estado`, { observe: 'response' });
  }
  getConselhos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Conselho[]>>(`${this.endpoint}/conselho`, { observe: 'response' });
  }
  getAreasAtendimento(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<AreaAtendimento[]>>(`${this.endpoint}/area-atendimento`, { observe: 'response' });
  }
  getTransportes(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Transporte[]>>(`${this.endpoint}/transporte`, { observe: 'response' });
  }
  getInstrucoes(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Instrucao[]>>(`${this.endpoint}/instrucao`, { observe: 'response' });
  }
  getCategoriasCNH(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<CategoriaCNH[]>>(`${this.endpoint}/categoria-cnh`, { observe: 'response' });
  }
  getTipoContas(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<TipoConta[]>>(`${this.endpoint}/tipo-conta`, { observe: 'response' });
  }
  getBancos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Banco[]>>(`${this.endpoint}/banco`, { observe: 'response' });
  }
  getPaises(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Pais[]>>(`${this.endpoint}/pais`, { observe: 'response' });
  }
  getParentescos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Parentesco[]>>(`${this.endpoint}/parentesco`, { observe: 'response' });
  }
  getModelos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Modelo[]>>(`${this.endpoint}/modelo`, { observe: 'response' });
  }
  getGrupos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Grupo[]>>(`${this.endpoint}/grupo`, { observe: 'response' });
  }
  getStatusAtendimento(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<StatusAtendimento[]>>(`${this.endpoint}/status-atendimento`, { observe: 'response' });
  }
}
