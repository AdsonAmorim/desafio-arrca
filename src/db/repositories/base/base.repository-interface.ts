export interface BaseRepositoryInterface<T> {
  create(entity: T): Promise<any>;
  update(entity: T): Promise<T>;
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  createMany(entities: Array<T>): Promise<any>;
}
