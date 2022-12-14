import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeCare } from 'src/app/homecares/classes/homecare.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class HomecareService {

  private endpoint: string = `${environment.apiConnecta}/homecares`;

  constructor(private _http: HttpClient) {
  }

  cadastrar(payload: HomeCare): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

  alterar(payload: HomeCare): Observable<HttpResponse<any>> {
    return this._http.put<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

  consultar(id: number): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}/${id}`, {observe: 'response'});
  }

  getAll(): Observable<HttpResponse<any>> {
    return this._http.get<HttpResponse<any>>(`${this.endpoint}`, {observe: 'response'});
  }

}
