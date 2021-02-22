/**
 * @jest-environment node
 */

const tripAdvisorScraper = require("./TripAdvisor_Scrape/tripAdvisorScraper");
const instaScraper = require("./Instagram_Scrape/insta_scraper");
const ytScraper = require("./YouTube_Scrape/yt_scraper");

/// TripAdvisor Scraper Tests ///

test("TripAdvisor Scraper output defined", async () => {
  const data = await tripAdvisorScraper("New York City");
  expect(data).not.toBeUndefined();
});

test("TripAdvisor Scraper output contains required items", async () => {
  const data = await tripAdvisorScraper("New York City");

  expect(data).toEqual(
    expect.objectContaining({
      attractions: expect.any(Object),
      restaurants: expect.any(Object),
      hotels: expect.any(Object),
    })
  );
});

test("TripAdvisor Scraper output contains required # of addresses", async () => {
  const data = await tripAdvisorScraper("New York City");
  expect(data["attractions"]["addressList"].length).toBe(10);
});

/// Instagram Scraper Tests ///

test("Instagram Scraper output defined", async () => {
  const data = await instaScraper("Statue of Liberty");
  expect(data).not.toBeUndefined();
});

test("Instagram Scraper output contains required items", async () => {
  const data = await instaScraper("Statue of Liberty");

  expect(data["instaPosts"][0][0]).toEqual(
    expect.objectContaining({
      imgSrc: expect.any(String),
      timeStamp: expect.any(String),
      caption: expect.any(String),
    })
  );
});

/// YouTube Scraper Tests ///

test("YouTube Scraper output defined", async () => {
  const data = await ytScraper("Statue of Liberty");
  expect(data).not.toBeUndefined();
});
