// TODO: test scraper w/o headless: false

const axios = require("axios");
const puppeteer = require("puppeteer");

const instaQlScrape = (res) => {
  let edges = res.graphql.hashtag.edge_hashtag_to_top_posts.edges;

  let posts = edges.map((edge) => {
    if (edge)
      return {
        imgSrc: edge.node.display_url,
        timeStamp: new Date(edge.node.taken_at_timestamp), // convert timestamp to readable time
        caption: edge.node.accessibility_caption,
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
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.goto("https://www.instagram.com/accounts/login/", {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', "username");
  await page.type('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // addresses["addressList"].map(async (address) => {
  const addressFiltered = address.replace(/[^a-zA-Z0-9]/g, "");
  const url = `https://www.instagram.com/explore/tags/${addressFiltered}/?__a=1`;

  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  let res = await page.evaluate(() => {
    return JSON.parse(document.querySelector("body").innerText);
  });

  arr.push(instaQlScrape(res));

  console.log(arr);
};

module.exports = instaPostScraper;
