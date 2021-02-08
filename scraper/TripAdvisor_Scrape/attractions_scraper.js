const cheerio = require("cheerio");
const express = require("express");
router = express.Router();
const pool = require("../../db/index");
const axios = require("axios");
const fetch = require("node-fetch");
const { text } = require("body-parser");

// db query for city info
const cityQuery = (name) => {
  return pool.query("SELECT name, state, TA_code FROM cities WHERE name=$1", [
    name,
  ]);
};

// fetch lat/lon coordinates of corresponding address from nominatim.openstreetmap
const coordinateQuery = async (address) => {
  const fetchData = await fetch(
    "https://nominatim.openstreetmap.org/search?format=json&q=" + address
  );
  const jsonData = await fetchData.json();
  return [jsonData[0].lat, jsonData[0].lon];
};

// get top attractions of the city
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
  var scrape = $("._255i5rcQ > h3")
    .contents()
    .map(function () {
      return this.type === "text" ? $(this).text() : "";
    })
    .get();

  // process data items to remove numbers & undefined data
  scrape.map((text) => {
    if (text.match(/[a-zA-Z]\w+/g)) fetchList.push(text);
  });
  const addressList = fetchList.slice(0, 10);

  const coordinates = [];

  // fetch coordinates of the list of addresses/attractions
  await Promise.all(
    addressList.map(async (address) => {
      let res = await coordinateQuery(address);
      coordinates.push(res);
    })
  );

  res.json({ addressList, coordinates });
});

module.exports = router;
