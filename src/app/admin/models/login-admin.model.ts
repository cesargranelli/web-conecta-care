export class LoginAdmin {

  constructor(private _email: string, private _password: string) { };

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

}
