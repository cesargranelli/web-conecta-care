import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AreaAtendimento } from '../class/area-atendimento.class';
import { Conselho } from '../class/conselho.class';
import { EstadoCivil } from '../class/estado-civil.class';
import { Estado } from '../class/estado.class';
import { Genero } from '../class/genero.class';
import { TipoEmpresa } from '../class/tipo-empresa.class';
import { Transporte } from '../class/transporte.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DominioService {

  private endpoint: string = `${environment.apiUrl}/dominio`;

  constructor(private http: HttpClient) { }

  getGeneros(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<Genero[]>>(`${this.endpoint}/genero`,
      { observe: 'response' });
  }

  getTipoEmpresas(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<TipoEmpresa[]>>(`${this.endpoint}/tipo-empresa`,
      { observe: 'response' });
  }

  getEstadoCivis(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<EstadoCivil[]>>(`${this.endpoint}/estado-civil`,
      { observe: 'response' });
  }

  getEstados(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<Estado[]>>(`${this.endpoint}/estado`,
      { observe: 'response' });
  }

  getConselhos(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<Conselho[]>>(`${this.endpoint}/conselho`,
      { observe: 'response' });
  }

  getAreasAtendimento(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<AreaAtendimento[]>>(`${this.endpoint}/area-atendimento`,
      { observe: 'response' });
  }

  getTransportes(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<Transporte[]>>(`${this.endpoint}/transporte`,
      { observe: 'response' });
  }

}
