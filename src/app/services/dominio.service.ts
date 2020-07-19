import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AreaAtendimento } from '../classes/area-atendimento.class';
import { Banco } from '../classes/banco.class';
import { CategoriaCNH } from '../classes/categoria-cnh.class';
import { Conselho } from '../classes/conselho.class';
import { EstadoCivil } from '../classes/estado-civil.class';
import { Estado } from '../classes/estado.class';
import { Genero } from '../classes/genero.class';
import { Instrucao } from '../classes/instrucao.class';
import { TipoConta } from '../classes/tipo-conta.class';
import { TipoEmpresa } from '../classes/tipo-empresa.class';
import { Transporte } from '../classes/transporte.class';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DominioService {

  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/dominio`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set('Token', 'Bearer ' + this._tokenService.getToken());
  }

  getGeneros(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Genero[]>>(`${this.endpoint}/genero`,
    { headers: this._headers, observe: 'response' });
}

  getTipoEmpresas(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<TipoEmpresa[]>>(`${this.endpoint}/tipo-empresa`,
      { headers: this._headers, observe: 'response' });
  }

  getEstadoCivis(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<EstadoCivil[]>>(`${this.endpoint}/estado-civil`,
      { headers: this._headers, observe: 'response' });
  }

  getEstados(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Estado[]>>(`${this.endpoint}/estado`,
      { headers: this._headers, observe: 'response' });
  }

  getConselhos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Conselho[]>>(`${this.endpoint}/conselho`,
      { headers: this._headers, observe: 'response' });
  }

  getAreasAtendimento(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<AreaAtendimento[]>>(`${this.endpoint}/area-atendimento`,
      { headers: this._headers, observe: 'response' });
  }

  getTransportes(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Transporte[]>>(`${this.endpoint}/transporte`,
      { headers: this._headers, observe: 'response' });
  }

  getInstrucoes(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Instrucao[]>>(`${this.endpoint}/instrucao`,
      { headers: this._headers, observe: 'response' });
  }

  getCategoriasCNH(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<CategoriaCNH[]>>(`${this.endpoint}/categoria-cnh`,
      { headers: this._headers, observe: 'response' });
  }

  getTipoContas(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<TipoConta[]>>(`${this.endpoint}/tipo-conta`,
      { headers: this._headers, observe: 'response' });
  }

  getBancos(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Banco[]>>(`${this.endpoint}/banco`,
      { headers: this._headers, observe: 'response' });
  }

}
