import { Store } from "../db/models/store.model";
import { randomUUID } from "crypto";

export class StoreFactory {
  public static create(name: string, type: string, assestmentsSummary: number) {
    return new Store(randomUUID(), name, type, assestmentsSummary);
  }
}
