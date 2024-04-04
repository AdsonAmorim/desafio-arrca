import { Page } from "puppeteer";
import { Selector } from "../types";

export const getAssestments = async (page: Page) => {
  const buttonElement = await page.waitForSelector(
    'button[data-tab-index="1"]'
  );

  if (!buttonElement) {
    throw new Error("Element not found");
  }

  await buttonElement.evaluate((button) => button.click());

  await page.waitForNavigation({
    waitUntil: "networkidle2",
    timeout: 600000,
  });

  await page.waitForSelector(".jftiEf.fontBodyMedium");

  const content = await page.evaluate(() => {
    const elements = document.querySelectorAll(".jftiEf.fontBodyMedium");

    return Array.from(elements).map((el) => {
      const user =
        el.querySelector("button > div:nth-child(1)")?.textContent ?? "";

      const hasMoreComment = el.querySelector(
        'button[aria-expanded="false"]'
      ) as HTMLButtonElement | null;

      if (hasMoreComment) {
        hasMoreComment.click();
      }

      const comment =
        el.querySelector("div.MyEned > span:nth-child(1)")?.textContent ?? "";

      return {
        user,
        comment,
      };
    });
  });

  return { id: Selector.ASSESTMENTS, content };
};
