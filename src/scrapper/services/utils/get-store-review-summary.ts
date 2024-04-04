import { Page } from "puppeteer";
import { reviewSummaryQuantity } from "../../template/texts";
import { Selector } from "../types";

export const getStoreReviewSummary = async (page: Page) => {
  const reviewSummary = await page.$eval(
    reviewSummaryQuantity,
    (el) => el.innerText
  );

  return { id: Selector.REVIEW_SUMMARY_QUANTITY, content: reviewSummary };
};
