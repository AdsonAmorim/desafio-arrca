export class Assestment {
  private _id: string = "";
  private _user: string = "";
  private _comment: string = "";
  private _storeId: string = "";

  constructor(id: string, user: string, comment: string, storeId: string) {
    this._id = id;
    this._user = user;
    this._comment = comment;
    this._storeId = storeId;
  }

  get id(): string {
    return this._id;
  }
  get user(): string {
    return this._user;
  }
  get comment(): string {
    return this._comment;
  }
  get storeId(): string {
    return this._storeId;
  }
}
