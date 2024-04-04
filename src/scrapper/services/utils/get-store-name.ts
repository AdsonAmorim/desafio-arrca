import { Page } from "puppeteer";
import { storeTitle } from "../../template/texts";
import { Selector } from "../types";

export const getStoreName = async (page: Page) => {
  const name = await page.$eval(storeTitle, (el) => el.innerText);

  return { id: Selector.TITLE, content: name };
};
