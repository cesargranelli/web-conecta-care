export class ValidaToken {

  constructor(private _role: string, private _id: number) {}

  public get role(): string {
    return this._role;
  }

  public get id(): number {
    return this._id;
  }

  public set role(role: string) {
    this._role = role;
  }

  public set id(id: number) {
    this._id = id;
  }

}
