import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SendEmail } from '../classes/send-email.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class EmailService {

  private endpoint: string = `${environment.apiConnecta}/emails`;

  constructor(private _http: HttpClient) { }

  enviar(payload: SendEmail): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
