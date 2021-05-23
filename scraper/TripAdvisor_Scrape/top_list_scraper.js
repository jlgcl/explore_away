const axios = require("axios");
const cheerio = require("cheerio");
const coordinateQuery = require("./coordinate_query");

const topListScraper = async (category, cityName, stateName, cityCode) => {
  const fetchList = [];

  let url = `https://www.tripadvisor.ca/${category}-${cityCode}-Activities-${cityName}_${stateName}.html`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let scrapeLink;

  switch (category) {
    case "Attractions":
      scrapeLink = "._1gpq3zsA._1zP41Z7X";
      break;
    case "Restaurants":
      scrapeLink =
        "._1kNOY9zw > ._2Q7zqOgW > ._2kbTRHSI > .wQjYiB7z > span > a";
      break;
    case "Hotels":
      scrapeLink = ".listing_title > a";
      break;
  }

  // obtain attraction item individually
  var scrape = $(scrapeLink)
    .contents()
    .map(function () {
      return this.type === "text" ? $(this).text() : "";
    })
    .get();

  // process data items to remove numbers & undefined data
  scrape.map((text) => {
    text = text.trim(); // removes irrelevant spaces
    if (text.match(/[a-zA-Z]\w+/g)) fetchList.push(text);
  });
  // top 10 items
  let addressList = fetchList.slice(0, 10);

  const coordinates = [];

  // fetch coordinates of the list of addresses/attractions
  await Promise.all(
    addressList.map(async (address) => {
      let res = await coordinateQuery(address);
      if (res !== null) {
        // push address name & parsed coordinate floats from JSON string
        coordinates.push([address, res.map((e) => parseFloat(e))]);
      } else {
        // filter out null coordinate results
        addressList = addressList.filter((item) => item !== address);
      }
    })
  );

  return { addressList, coordinates };
};

module.exports = topListScraper;
