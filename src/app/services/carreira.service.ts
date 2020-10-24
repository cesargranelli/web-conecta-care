import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Carreira} from '../classes/carreira.class';
import {CarreiraResponseInterface} from './response/carreiraResponse.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CarreiraService {

  private endpoint: string = `${environment.apiConnecta}/carreiras`;

  constructor(private _http: HttpClient) {
  }

  getDados(id: number): Observable<Carreira> {
    return this._http.get(`${this.endpoint}/${id}`).pipe(map((carreira: CarreiraResponseInterface) => {
        return carreira.data;
      })
    );
  }

  save(payload: Carreira): Observable<HttpResponse<any>> {
    return this._http.post<HttpResponse<any>>(`${this.endpoint}`, payload, {observe: 'response'});
  }

}
