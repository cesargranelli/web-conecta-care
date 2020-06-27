import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstadoCivil } from '../class/estado-civil.class';
import { Genero } from '../class/genero.class';
import { TipoEmpresa } from '../class/tipo-empresa.class';

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

}
