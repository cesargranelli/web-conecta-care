import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Experiencia } from '../classes/experiencia.class';
import { ExperienciaResponseInterface } from './response/experienciaResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ExperienciaService {

  private endpoint: string = `${environment.apiConnecta}/experiencias`;

  constructor(private _http: HttpClient) { }

  getDados(id: number): Observable<Array<Experiencia>> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((experiencias: ExperienciaResponseInterface) => {
        return experiencias.data;
      })
    );
  }

  save(payload: Experiencia[]): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
