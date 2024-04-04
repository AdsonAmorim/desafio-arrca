import { Page } from "puppeteer";
import { storeType } from "../../template/texts";
import { Selector } from "../types";

export const getStoreType = async (page: Page) => {
  const type = await page.$eval(storeType, (el) => el.innerText);
  return { id: Selector.TYPE, content: type };
};
