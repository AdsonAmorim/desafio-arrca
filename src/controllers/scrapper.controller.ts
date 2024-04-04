import { StoreRepositoryInterface } from "../db/repositories/store";

import { Request, Response } from "express";
import { scrapper } from "../scrapper/services";
import { StoreFactory } from "../factory/store.factory";
import { AssestmentFactory } from "../factory/assestment.factory";

export class ScrapperController {
  private storeRepository: StoreRepositoryInterface;

  constructor(storeRepository: StoreRepositoryInterface) {
    this.storeRepository = storeRepository;
  }

  async run(request: Request, response: Response) {
    const urls = request.body.urls;

    const data = await scrapper(urls);

    if (!data) {
      throw new Error("Failed to scrap");
    }

    const stores = data.map((storeIterator) => {
      const store = StoreFactory.create(
        storeIterator.title,
        storeIterator.type,
        Number(storeIterator.reviewSummaryQuantity.replace(",", "."))
      );

      const assestments = storeIterator.assestments.map(
        (assestmentIterator) => {
          return AssestmentFactory.create(
            assestmentIterator.user,
            assestmentIterator.comment,
            store.id
          );
        }
      );

      store.addAssestments(assestments);

      return store;
    });

    await this.storeRepository.createMany(stores);

    return response.status(201).json({ data });
  }
}
