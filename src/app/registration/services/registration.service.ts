import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Role } from 'src/app/enums/role.enum';
import { environment } from 'src/environments/environment';
import { RegistrationDocument } from 'src/app/services/feat/registration-document';
import { RegistrationRecord } from 'src/app/services/feat/registration-record';

export interface UserCredentials {
  email: string;
  password: string;
  role: Role;
  sequence: number;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {

  private readonly http = inject(HttpClient);
  private readonly api = environment.apiConnecta;

  registerDocument(doc: RegistrationDocument): Observable<RegistrationRecord> {
    return this.http.post<RegistrationRecord>(`${this.api}/documentos`, doc);
  }

  registerCredentials(credentials: UserCredentials): Observable<void> {
    return this.http.post<void>(`${this.api}/usuarios`, credentials);
  }

  /** Full flow: register document, then credentials. Returns the document record. */
  register(doc: RegistrationDocument, credentials: Omit<UserCredentials, 'sequence'>): Observable<RegistrationRecord> {
    return this.registerDocument(doc).pipe(
      switchMap(record =>
        this.registerCredentials({ ...credentials, sequence: record.id }).pipe(
          switchMap(() => [record])
        )
      )
    );
  }
}
