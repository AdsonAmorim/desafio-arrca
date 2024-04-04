import { Cluster } from "puppeteer-cluster";

import { Selector } from "./types";
import { getStoreName } from "./utils/get-store-name";
import { getStoreType } from "./utils/get-store-type";
import { getStoreReviewSummary } from "./utils/get-store-review-summary";
import { getAssestments } from "./utils/get-assestments";

const MAX_CONCURRENCY_CLUSTER = 3;

type ScrapperResponse = Record<Selector, any>;

export const scrapper = async (
  urls: string[]
): Promise<Array<ScrapperResponse>> => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: MAX_CONCURRENCY_CLUSTER,
    puppeteerOptions: {
      headless: false,
      defaultViewport: null,
      userDataDir: "./temp",
    },
  });

  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  let data: Array<Record<Selector, string>> = [];

  // executa a pra cada URL fornecida
  await cluster.task(async ({ page, data: url }) => {
    // vai até o site

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 600000,
    });

    // aguarda o carregamento da página
    await page.waitForSelector("body");

    const elements = await Promise.all([
      getStoreName(page),
      getStoreType(page),
      getStoreReviewSummary(page),
      getAssestments(page),
    ]);

    const result = elements.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        [currentValue.id]: currentValue.content,
      };
    }, {} as ScrapperResponse);

    data.push(result);
  });

  // empilha as urls que serão buscadas
  urls.forEach(async (url) => {
    await cluster.queue(url);
  });

  await cluster.idle();
  await cluster.close();

  return data;
};
