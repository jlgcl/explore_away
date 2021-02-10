const instaPostScraper = require("./instaPostScraper");

// Instagram scraper: must remove spaces from addresses

const instagramScraper = async (attractions, restaurants, hotels) => {
  // img alt if no post message exists
  // img class='FFVAD' under 'KL4Bh'
  // post messsage class title='Edited' (span) under '_61Ajh' under 'C4VMK'

  let attractionsPosts = instaPostScraper(attractions);
  let restaurantsPosts = instaPostScraper(restaurants);
  let hotelsPosts = instaPostScraper(hotels);

  return { attractionsPosts, restaurantsPosts, hotelsPosts };
};

module.exports = instagramScraper;
