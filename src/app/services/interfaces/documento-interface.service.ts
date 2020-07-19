import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Documento } from '../feat/documento';

export declare interface DoumentoService {
  registrar(documento: Documento): Observable<HttpResponse<any>>;
}
