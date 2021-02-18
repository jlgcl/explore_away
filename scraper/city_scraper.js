const express = require("express");
router = express.Router();
const pool = require("../db/index");
const topListScraper = require("./TripAdvisor_Scrape/top_list_scraper");
const instagramScraper = require("../scraper/Instagram_Scrape/insta_scraper");

// db query for city info
const cityQuery = (name) => {
  return pool.query("SELECT name, state, TA_code FROM cities WHERE name=$1", [
    name,
  ]);
};

router.get("/api/city/:cityname", async (req, res) => {
  const { rows } = await cityQuery(req.params.cityname);
  const cityName = rows[0]["name"];
  const stateName = rows[0]["state"];
  const cityCode = rows[0]["ta_code"];

  /// TRIP ADVISOR /// TEMPORARILY DISABLE ATTRACTIONS & HOTELS FOR TESTING
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

  /// INSTAGRAM ///
  const instaPosts = await instagramScraper(attractions, restaurants, hotels);

  //res.json({ attractions, restaurants, hotels });
  res.json({ instaPosts });
});

module.exports = router;
