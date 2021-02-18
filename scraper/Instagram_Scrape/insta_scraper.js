const instaPostScraper = require("./instaPostScraper");

const instagramScraper = async (attractions, restaurants, hotels) => {
  let attractionsPosts = await instaPostScraper(attractions);
  let restaurantsPosts = await instaPostScraper(restaurants);
  let hotelsPosts = await instaPostScraper(hotels);

  return { attractionsPosts, restaurantsPosts, hotelsPosts };
};

module.exports = instagramScraper;
