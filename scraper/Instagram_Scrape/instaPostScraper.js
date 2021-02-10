const cheerio = require("cheerio");
const axios = require("axios");

const instaPostScraper = async (addresses) => {
  let arr = [];

  addresses[0].map((address) => {
    const data = axios.get(`https://instagram.com/explore/tags/${address}`);
    const $ = cheerio.load(data);

    const message = $(".C4VMK > ._61Ajh > .Edited")
      .contents()
      .map(function () {
        return this.type === "text" ? $(this).text() : "";
      })
      .get();

    const imageSrc = $(".KL4Bh").children("img").attr("alt");

    if (message) arr.push([message, imageSrc]);
    else arr.push([null, imageSrc]);
  });

  return arr;
};

module.exports = instaPostScraper;
