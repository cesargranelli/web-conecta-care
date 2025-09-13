import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Documento } from './feat/documento';
import { Registro } from './feat/registro';
import { catchError, map } from 'rxjs/operators';
import { ApiErrorHandler } from './handler/api-error-handler';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DocumentoService {

  private endpoint: string = `${environment.apiConecta}/documentos`;

  constructor(private http: HttpClient, private error: ApiErrorHandler) {
  }

  registrar(documento: Documento): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<Registro>>(`${this.endpoint}`, documento,
      { observe: 'response' });
  }

  registro(documento: Documento): Observable<Registro> {
    return this.http.post<Registro>(`${this.endpoint}`, documento).pipe(
      map((registro: Registro) => registro),
      catchError(this.error.handleError<Registro>(`Módulo: ${documento.modulo}`))
    );
  }

  pesquisar(idDocumento: number): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<Registro>>(`${this.endpoint}/${idDocumento}`,
      { observe: 'response' });
  }

}
