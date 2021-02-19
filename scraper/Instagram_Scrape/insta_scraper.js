const instaPostScraper = require("./instaPostScraper");

const instaScraper = async (address) => {
  let instaPosts = await instaPostScraper(address);

  return { instaPosts };
};

module.exports = instaScraper;
