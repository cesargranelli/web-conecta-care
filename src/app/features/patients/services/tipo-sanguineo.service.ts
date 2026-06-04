import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoSanguineoService {

  constructor(private _http: HttpClient) {
  }

  listarTipoSanguineo(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}/api/v1/tipo-sanguineo`, {observe: 'response'});
  }

}
