import { Assestment } from "../db/models/assestment.model";
import { randomUUID } from "crypto";

export class AssestmentFactory {
  public static create(user: string, comment: string, storeId: string) {
    return new Assestment(randomUUID(), user, comment, storeId);
  }
}
