const puppeteer = require("puppeteer");
require("dotenv").config();

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

const instaPostScraper = async (address) => {
  let arr = [];

  const addressFiltered = address.replace(/[^a-zA-Z0-9]/g, "");
  const url = `https://www.instagram.com/explore/tags/${addressFiltered}/?__a=1`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // disable website useragent block
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.instagram.com/accounts/login/", {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector('input[name="username"]'); // wait for the username input field to load
  await page.type('input[name="username"]', process.env.IG_USER);
  await page.type('input[name="password"]', process.env.IG_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: "load" }); // wait for full page load

  await page.goto(url, { waitUntil: "load", timeout: 0 });

  let res = await page.evaluate(() => {
    return JSON.parse(document.querySelector("body").innerText);
  });

  arr.push(instaQlScrape(res));

  await browser.close();

  if (arr.length > 0) return arr;
  else return "";
};

module.exports = instaPostScraper;
