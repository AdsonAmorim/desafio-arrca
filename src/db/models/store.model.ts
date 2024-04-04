import { Assestment } from "./assestment.model";

export class Store {
  private _id: string = "";
  private _name: string = "";
  private _type: string = "";
  private _assestmentsSummary: number = 0;
  private _assestments: Assestment[] | null = null;

  constructor(
    id: string,
    name: string,
    type: string,
    assestmentsSummary: number
  ) {
    this._id = id;
    this._name = name;
    this._type = type;
    this._assestmentsSummary = assestmentsSummary;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get assestmentsSummary(): number {
    return this._assestmentsSummary;
  }

  get assestments(): Assestment[] | null {
    return this._assestments;
  }

  addAssestments(assestments: Assestment[]) {
    this._assestments = assestments;
  }
}
