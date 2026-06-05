import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationDocument } from '../models/registration-document';
import { RegistrationRecord } from '../models/registration-record';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiConnecta}/documentos`;

  register(document: RegistrationDocument): Observable<RegistrationRecord> {
    return this.http.post<RegistrationRecord>(this.endpoint, document);
  }

  findById(id: number): Observable<HttpResponse<RegistrationRecord>> {
    return this.http.get<RegistrationRecord>(`${this.endpoint}/${id}`, { observe: 'response' });
  }

  /** Legacy method used by some components */
  registrar(payload: { numero: string; tipo: string; modulo: string }): Observable<RegistrationRecord> {
    return this.http.post<RegistrationRecord>(this.endpoint, payload);
  }

  /** Legacy method used by some components */
  pesquisar(id: number): Observable<HttpResponse<RegistrationRecord>> {
    return this.http.get<RegistrationRecord>(`${this.endpoint}/${id}`, { observe: 'response' });
  }
}
