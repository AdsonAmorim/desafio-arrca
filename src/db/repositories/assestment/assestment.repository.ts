import { PrismaClient } from "@prisma/client";
import { Assestment } from "../../../db/models/assestment.model";

import { AssestmentRepositoryInterface } from "./assestment.repository-interface";

export class AssestmentRepository implements AssestmentRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async create(entity: Assestment): Promise<void> {
    await this.prisma.assestment.create({
      data: {
        content: entity.comment,
        username: entity.user,
        storeId: entity.storeId,
      },
    });
  }

  async find(id: string): Promise<Assestment | null> {
    return null;
  }

  async findAll(): Promise<Assestment[]> {
    return [];
  }

  async update(entity: Assestment): Promise<Assestment> {
    return {} as Assestment;
  }

  async createMany(entities: Assestment[]) {
    await Promise.all(
      entities.map(
        async (entity) =>
          await this.prisma.assestment.create({
            data: {
              content: entity.comment,
              username: entity.user,
              storeId: entity.storeId,
            },
          })
      )
    );
  }
}
