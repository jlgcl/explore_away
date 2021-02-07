const cheerio = require("cheerio");
const express = require("express");
router = express.Router();
const pool = require("../db/index");
const axios = require("axios");
const { text } = require("body-parser");

const cityQuery = (name) => {
  return pool.query("SELECT name, state, TA_code FROM cities WHERE name=$1", [
    name,
  ]);
};

// Get top attractions of the city
router.get("/api/attractions/:cityname", async (req, res) => {
  const { rows } = await cityQuery(req.params.cityname);
  const cityName = rows[0]["name"];
  const stateName = rows[0]["state"];
  const cityCode = rows[0]["ta_code"];

  const fetchList = [];

  let url = `https://www.tripadvisor.ca/Attractions-${cityCode}-Activities-${cityName}_${stateName}.html`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  // obtain attraction item individually
  var t = $("._255i5rcQ > h3")
    .contents()
    .map(function () {
      return this.type === "text" ? $(this).text() : "";
    })
    .get();

  // process data items to remove numbers & undefined data
  t.map((text) => {
    if (text.match(/[a-zA-Z]\w+/g)) fetchList.push(text);
  });
  const resList = fetchList.slice(0, 10);

  res.json(resList);
});

module.exports = router;
