import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../feat/documento';

export declare interface DoumentoService {
  pesquisar(documento: Documento): Observable<HttpResponse<any>>;
}
