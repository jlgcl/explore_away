// PROGRESS: work with Puppeteer to obtain Instagram img attr & src

const puppeteer = require("puppeteer");

const instaPostScraper = async (addresses) => {
  let arr = [];
  const address = addresses["addressList"][0];

  //addresses["addressList"].map(async (address) => {
  const browser = await puppeteer.launch({ headless: false });

  const addressFiltered = address.replace(/[^a-zA-Z0-9]/g, "");
  const url = `https://instagram.com/explore/tags/${addressFiltered}`;
  const page = await browser.newPage();
  await page.goto("https://instagram.com/accounts/login/");
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', "username");
  await page.type('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });
  await page.goto(url);

  //const result = await page.$$('div[class="KL4Bh"] > img');

  await page.waitForSelector(".KL4Bh img");

  const result = await page.evaluate(() => {
    return document.querySelectorAll(".KL4Bh img");
  });

  console.log(result);
  //});

  //console.log(arr);
  //return arr;
  //browser.close();
};

module.exports = instaPostScraper;
