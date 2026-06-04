import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailPayload } from '../models/email-payload.model';

@Injectable({ providedIn: 'root' })
export class EmailService {

  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiConnecta}/emails`;

  send(payload: EmailPayload): Observable<HttpResponse<void>> {
    return this.http.post<void>(this.endpoint, payload, { observe: 'response' });
  }
}
