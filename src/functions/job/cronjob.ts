import { StoreFactory } from "../../factory/store.factory";
import { scrapper } from "../../scrapper/services";
import { AssestmentFactory } from "../../factory/assestment.factory";
import { StoreRepositoryInterface } from "@/db/repositories/store";

const urlsToScrapp = [
  "https://www.google.com/maps/place/Nema+-+Visconde+de+Piraj%C3%A1+%7C+Padaria+de+Fermenta%C3%A7%C3%A3o+Natural/@-22.9841517,-43.2128543,15z/data=!4m6!3m5!1s0x9bd58a0cdc1487:0x4c1eb56d62eb469b!8m2!3d-22.9841517!4d-43.2128543!16s%2Fg%2F11j20tdp78?entry=ttu",
  "https://www.google.com/maps/place/Nema+-+Botafogo+%7C+Padaria+de+Fermenta%C3%A7%C3%A3o+Natural/@-22.9561199,-43.2051002,15z/data=!4m6!3m5!1s0x997fd3ce25318b:0x17650611ede4f2c9!8m2!3d-22.9561199!4d-43.1963455!16s%2Fg%2F11pqxzwzs_?entry=ttu",
];

export class ScrapperJob {
  private storeRepository: StoreRepositoryInterface;

  constructor(storeRepository: StoreRepositoryInterface) {
    this.storeRepository = storeRepository;
  }

  async run() {
    const data = await scrapper(urlsToScrapp);

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
  }
}
