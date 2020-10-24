import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AreaAtendimento} from '../classes/area-atendimento.class';
import {Banco} from '../classes/banco.class';
import {CategoriaCNH} from '../classes/categoria-cnh.class';
import {Conselho} from '../classes/conselho.class';
import {EstadoCivil} from '../classes/estado-civil.class';
import {Estado} from '../classes/estado.class';
import {Genero} from '../classes/genero.class';
import {Instrucao} from '../classes/instrucao.class';
import {Pais} from '../classes/pais.class';
import {TipoConta} from '../classes/tipo-conta.class';
import {TipoEmpresa} from '../classes/tipo-empresa.class';
import {Transporte} from '../classes/transporte.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DominioService {

  private endpoint: string = `${environment.apiConnecta}/dominio`;

  constructor(private _http: HttpClient) {
  }

  getGeneros(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Genero[]>>(`${this.endpoint}/genero`, {observe: 'response'});
  }

  getTipoEmpresas(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<TipoEmpresa[]>>(`${this.endpoint}/tipo-empresa`, {observe: 'response'});
  }

  getEstadoCivis(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<EstadoCivil[]>>(`${this.endpoint}/estado-civil`, {observe: 'response'});
  }

  getEstados(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Estado[]>>(`${this.endpoint}/estado`, {observe: 'response'});
  }

  getConselhos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Conselho[]>>(`${this.endpoint}/conselho`, {observe: 'response'});
  }

  getAreasAtendimento(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<AreaAtendimento[]>>(`${this.endpoint}/area-atendimento`, {observe: 'response'});
  }

  getTransportes(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Transporte[]>>(`${this.endpoint}/transporte`, {observe: 'response'});
  }

  getInstrucoes(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Instrucao[]>>(`${this.endpoint}/instrucao`, {observe: 'response'});
  }

  getCategoriasCNH(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<CategoriaCNH[]>>(`${this.endpoint}/categoria-cnh`, {observe: 'response'});
  }

  getTipoContas(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<TipoConta[]>>(`${this.endpoint}/tipo-conta`, {observe: 'response'});
  }

  getBancos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Banco[]>>(`${this.endpoint}/banco`, {observe: 'response'});
  }

  getPaises(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Pais[]>>(`${this.endpoint}/pais`, {observe: 'response'});
  }

}
