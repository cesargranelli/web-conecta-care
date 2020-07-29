import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { TokenService } from '../../services/token.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class ProfissionalService {
  private _headers: HttpHeaders = new HttpHeaders();

  private endpoint: string = `${environment.apiUrl}/profissionais`;

  constructor(private _http: HttpClient, private _tokenService: TokenService) {
    this._headers = this._headers.set(
      'Token',
      'Bearer ' + this._tokenService.getToken()
    );
  }

  eventos(id: number): Observable<any> {
    return this._http.get<any>(`${this.endpoint}/${id}/eventos`, {
      headers: this._headers,
      observe: 'response',
    });
  }
}
