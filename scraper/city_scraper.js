const $ = require("cheerio");

url =
  "https://www.tripadvisor.ca/Attractions-g60763-Activities-New_York_City_New_York.html";

fetch(url)
  .then((html) => {
    console.log($("body > div > div > div > div", html));
  })
  .catch((err) => {
    console.log(err);
  });
