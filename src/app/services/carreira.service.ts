import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Carreira } from '../class/carreira.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CarreiraService {

  private endpoint: string = `${environment.apiUrl}/carreiras`;

  constructor(private http: HttpClient) { }

  save(payload: Carreira): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
