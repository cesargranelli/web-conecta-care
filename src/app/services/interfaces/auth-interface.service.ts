import { Observable } from 'rxjs/internal/Observable';

export declare interface AuthInterfaceService {
  login(user: object): Observable<boolean>;
  logout(): void;
  isLoggedIn(): boolean;
  getToken(): string;
  getValid(): string;
}
