const instaPostScraper = require("./instaPostScraper");

// Instagram scraper: must remove spaces from addresses

const instagramScraper = async (restaurants) => {
  /// TEMPORARILY DISABLE ATTRACTIONS & HOTELS FOR TESTING ///
  // img alt if no post message exists
  // img class='FFVAD' under 'KL4Bh'
  // post messsage class title='Edited' (span) under '_61Ajh' under 'C4VMK'

  //let attractionsPosts = instaPostScraper(attractions);
  let restaurantsPosts = await instaPostScraper(restaurants);
  //let hotelsPosts = instaPostScraper(hotels);

  console.log(restaurantsPosts);

  //return { attractionsPosts, restaurantsPosts, hotelsPosts };
};

module.exports = instagramScraper;
