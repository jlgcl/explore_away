// TODO: test routes - remember to put username & password

const express = require("express");
const router = express.Router();
const tripAdvisorScraper = require("./TripAdvisor_Scrape/tripAdvisorScraper");
const instaScraper = require("./Instagram_Scrape/insta_scraper");
const ytScraper = require("./YouTube_Scrape/yt_scraper");

router.get("/api/tripadvisor/:cityName", async (req, res) => {
  const city = req.params.cityName;
  const response = await tripAdvisorScraper(city);

  res.json(response);
});

router.get("/api/instagram/:address", async (req, res) => {
  const address = req.params.address;
  const response = await instaScraper(address);

  res.json(response);
});

router.get("/api/youtube/:address", async (req, res) => {
  const address = req.params.address;
  const response = await ytScraper(address);

  res.json(response);
});

module.exports = router;
