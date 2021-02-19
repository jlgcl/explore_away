const pool = require("../../db/index");
const topListScraper = require("./top_list_scraper");

// db query for city info
const cityQuery = (name) => {
  // case-sensitive query
  return pool.query("SELECT name, state, TA_code FROM cities WHERE name=$1", [
    name,
  ]);
};

const tripAdvisorScraper = async (city) => {
  const { rows } = await cityQuery(city);
  const cityName = rows[0]["name"];
  const stateName = rows[0]["state"];
  const cityCode = rows[0]["ta_code"];

  /// TRIP ADVISOR ///
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

  return { attractions, restaurants, hotels };
};

module.exports = tripAdvisorScraper;
