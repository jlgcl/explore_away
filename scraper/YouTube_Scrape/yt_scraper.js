const fetch = require("node-fetch");
const axios = require("axios");
require("dotenv").config();
var { google } = require("googleapis");
var OAuth2 = google.auth.OAuth2;

const ytScraper = async (address) => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${address}&key=${process.env.PRIVATE_API_KEY}`,
      {
        method: "GET",
        Accept: "application/json",
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

module.exports = ytScraper;
