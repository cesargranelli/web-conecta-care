import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor(private _http: HttpClient) {
  }

  listarEstadoCivil(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}api/v1/estado-civil`, {observe: 'response'});
  }
  
}
