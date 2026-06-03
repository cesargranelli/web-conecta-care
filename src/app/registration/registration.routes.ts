import { Routes } from '@angular/router';
import { RegistrationDocumentComponent } from './registration-document.component';
import { RegistrationCredentialsComponent } from './registration-credentials.component';

export const CADASTRO_ROUTES: Routes = [
  { path: '', component: RegistrationDocumentComponent },
  { path: ':modulo/:id/cadastro/login', component: RegistrationCredentialsComponent }
];
