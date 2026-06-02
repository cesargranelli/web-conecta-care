import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Documento } from './feat/documento';
import { Registro } from './feat/registro';

@Injectable({ providedIn: 'root' })
export class DocumentoService {

  private readonly endpoint = `${environment.apiConnecta}/documentos`;

  constructor(private http: HttpClient) {}

  registrar(documento: Documento): Observable<HttpResponse<Registro>> {
    return this.http.post<Registro>(this.endpoint, documento, { observe: 'response' });
  }

  pesquisar(idDocumento: number): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<Registro>>(`${this.endpoint}/${idDocumento}`, { observe: 'response' });
  }
}
