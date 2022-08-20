import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Estado } from "../../classes/estado.class";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private _http: HttpClient) {
  }

  public listarEstado(): Observable<Array<Estado>> {
    return this._http.get(`${environment.apiConnecta}/api/v1/estado`).pipe(
      map((dado: any) => {
        return dado;
      }),
      catchError(async (err) => console.error(err))
    );
  }

}
