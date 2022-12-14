import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Documento} from './feat/documento';
import {Registro} from './feat/registro';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DocumentoService {

  private endpoint: string = `${environment.apiConnecta}/documentos`;

  constructor(private _http: HttpClient) {
  }

  registrar(documento: Documento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<Registro>>(`${this.endpoint}`, documento,
      {observe: 'response'});
  }

  pesquisar(idDocumento: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<Registro>>(`${this.endpoint}/${idDocumento}`,
      {observe: 'response'});
  }

}
