// TODO: test scraper

const axios = require("axios");

const instaPostScraper = async (addresses) => {
  let arr = [];

  //const address = addresses["addressList"][0];

  addresses["addressList"].map(async (address) => {
    const addressFiltered = address.replace(/[^a-zA-Z0-9]/g, "");
    const url = `https://instagram.com/explore/tags/${addressFiltered}`;

    const response = await axios.get(url);
    arr.push(instaQlScrape(response));
  });

  return arr;
};

const instaQlScrape = (response) => {
  let edges = response.data.graphql.hashtag.edge_hashtag_to_top_posts.edges;

  let posts = edges.map((edge) => {
    if (edge)
      return {
        imgSrc: edge.display_url,
        timeStamp: edge.taken_at_timestamp,
        caption: edge.accessibility_caption,
      };
    else return {};
  });

  return posts;
};

module.exports = instaPostScraper;
