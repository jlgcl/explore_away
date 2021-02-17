// TODO: test scraper w/o headless: false

const axios = require("axios");
const puppeteer = require("puppeteer");

const instaQlScrape = (response) => {
  let edges = response.data.graphql.hashtag.edge_hashtag_to_top_posts.edges;

  let posts = edges.map((edge) => {
    if (edge)
      return {
        imgSrc: edge.display_url,
        timeStamp: edge.taken_at_timestamp,
        caption: edge.accessibility_caption,
      };
    else return {};
  });

  return posts;
};

const instaPostScraper = async (addresses) => {
  let arr = [];

  const address = addresses["addressList"][0];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/accounts/login/");
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', "sensynn@gmail.com");
  await page.type('input[name="password"]', "KellySnn13678");
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // addresses["addressList"].map(async (address) => {
  const addressFiltered = address.replace(/[^a-zA-Z0-9]/g, "");
  const url = `https://www.instagram.com/explore/tags/${addressFiltered}/?__a=1`;

  await page.goto(url);

  let response = await page.evaluate(() => {
    return document.querySelector("body").innerText;
  });
  //const response = await axios.get(url);
  console.log(response);
  //arr.push(instaQlScrape(response));
  // });

  console.log(arr);
};

module.exports = instaPostScraper;
