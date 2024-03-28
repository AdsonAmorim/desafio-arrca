import puppeteer from "puppeteer";

const hello = async (event, context) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.google.com/maps/place/Nema+-+Visconde+de+Piraj%C3%A1+%7C+Padaria+de+Fermenta%C3%A7%C3%A3o+Natural/@-22.9841517,-43.2128543,15z/data=!4m6!3m5!1s0x9bd58a0cdc1487:0x4c1eb56d62eb469b!8m2!3d-22.9841517!4d-43.2128543!16s%2Fg%2F11j20tdp78?entry=ttu"
  );

  const element = await page.$eval(
    `#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div:nth-child(1) > h1`,
    (content) => console.log(content)
  );

  console.log({ element });

  //   await page.evaluate(() => {

  //     console.log(element);
  //   });

  await page.screenshot({ path: "example.png" });

  console.log("Hello World");
};

export { hello };
