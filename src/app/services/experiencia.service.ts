import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Experiencia } from '../class/experiencia.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ExperienciaService {

  private endpoint: string = `${environment.apiUrl}/experiencias`;

  constructor(private http: HttpClient) { }

  save(payload: Experiencia[]): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
