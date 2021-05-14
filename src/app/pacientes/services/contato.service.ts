import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private _http: HttpClient) {
  }

  consultar(id: number): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiConnecta}/api/v1/contato/${id}`, {observe: 'response'});
  }


}
