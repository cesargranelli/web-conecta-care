import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Complemento} from '../classes/complemento.class';
import {ResponseTemplateInterface} from "./response/responseTemplate.interface";

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ComplementoService {

  private endpoint: string = `${environment.apiConnecta}/complementos/profissional`;

  constructor(private _http: HttpClient) {
  }

  getDados(id: number): Observable<Complemento> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((complemento: ResponseTemplateInterface) => {
        return complemento.data;
      })
    );
  }

  save(payload: Complemento): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
