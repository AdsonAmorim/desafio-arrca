import { PrismaClient } from "@prisma/client";
import { Store } from "../../models/store.model";
import { StoreRepositoryInterface } from "./store.repository-interface";

export class StoreRepository implements StoreRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async create(entity: Store): Promise<void> {
    return;
  }

  async find(id: string): Promise<Store | null> {
    return null;
  }

  async findAll(): Promise<Store[]> {
    return [];
  }

  async update(entity: Store): Promise<Store> {
    return {} as Store;
  }

  async createMany(entities: Store[]) {
    await Promise.all(
      entities.map(
        async (entity) =>
          await this.prisma.store.create({
            data: {
              name: entity.name,
              type: entity.type,
              assestmentsSummary: entity.assestmentsSummary,
              assestments: {
                createMany: {
                  data: entity.assestments?.map((item) => ({
                    content: item.comment,
                    username: item.user,
                    id: item.id,
                  }))!,
                  skipDuplicates: true,
                },
              },
            },
            include: {
              assestments: true,
            },
          })
      )
    );
  }
}
