import { Store } from "../../../db/models/store.model";
import { BaseRepositoryInterface } from "../base/base.repository-interface";

export interface StoreRepositoryInterface
  extends BaseRepositoryInterface<Store> {}
