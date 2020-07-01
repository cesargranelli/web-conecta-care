import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contato } from '../class/contato.class';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ContatoService {

  private endpoint: string = `${environment.apiUrl}/contatos/telefones`;

  constructor(private http: HttpClient) { }

  save(payload: Contato): Observable<HttpResponse<any>> {
    console.log(payload);
    return this.http.post<HttpResponse<any>>(`${this.endpoint}`, payload,
      { observe: 'response' });
  }

}
