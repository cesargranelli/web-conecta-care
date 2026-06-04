import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Role } from 'src/app/core/enums/role.enum';
import { environment } from 'src/environments/environment';
import { RegistrationDocument } from 'src/app/core/models/registration-document';
import { RegistrationRecord } from 'src/app/core/models/registration-record';

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
          map(() => record)
        )
      )
    );
  }
}
