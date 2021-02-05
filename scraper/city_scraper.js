const cheerio = require("cheerio");
const express = require("express");
router = express.Router();
const pool = require("../db/index");
const axios = require("axios");

const cityQuery = (name) => {
  return pool.query("SELECT name, state, TA_code FROM cities WHERE name=$1", [
    name,
  ]);
};

router.get("/api/attractions/:cityname", async (req, res) => {
  const { rows } = await cityQuery(req.params.cityname);
  const cityName = rows[0]["name"];
  const stateName = rows[0]["state"];
  const cityCode = rows[0]["ta_code"];

  let url = `https://www.tripadvisor.ca/Attractions-${cityCode}-Activities-${cityName}_${stateName}.html`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  console.log($("._255i5rcQ > h3").text());
});

module.exports = router;
