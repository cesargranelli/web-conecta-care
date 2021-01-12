import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, map} from "rxjs/operators";
import {ResponseTemplateInterface} from "../../services/response/responseTemplate.interface";
import {Estado} from "../../classes/estado.class";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private _http: HttpClient) {
  }

  public listarEstado(): Observable<Array<Estado>> {
    return this._http.get(`${environment.apiConnecta}/api/v1/estado`).pipe(
      map((dado: ResponseTemplateInterface) => {
        return dado.data;
      }),
      catchError(async (err) => console.error(err))
    );
  }

}
