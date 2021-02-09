const express = require("express");
router = express.Router();
const pool = require("../../db/index");
const fetch = require("node-fetch");
const topListScraper = require("./top_list_scraper");

// db query for city info
const cityQuery = (name) => {
  return pool.query("SELECT name, state, TA_code FROM cities WHERE name=$1", [
    name,
  ]);
};

// get top attractions of the city
router.get("/api/scrape/:cityname", async (req, res) => {
  const { rows } = await cityQuery(req.params.cityname);
  const cityName = rows[0]["name"];
  const stateName = rows[0]["state"];
  const cityCode = rows[0]["ta_code"];

  const attractions = await topListScraper(
    "Attractions",
    cityName,
    stateName,
    cityCode
  );
  const restaurants = await topListScraper(
    "Restaurants",
    cityName,
    stateName,
    cityCode
  );
  const hotels = await topListScraper("Hotels", cityName, stateName, cityCode);

  res.json({ attractions, restaurants, hotels });
});

module.exports = router;
