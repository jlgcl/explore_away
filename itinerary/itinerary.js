const express = require("express");
const router = express.Router();
const pool = require("../db/index");

router.post("/api/add_itinerary", async (req, res) => {
  let username = req.body.username;
  let city = req.body.city;
  let address = req.body.address;
  let address_type = req.body.address_type;
  let time = req.body.time;

  pool
    .query(
      "INSERT INTO daily_itinerary(username, city, address, address_type, time) VALUES ($1, $2, $3, $4, $5)",
      [username, city, address, address_type, time]
    )
    .then((response) => res.json("Itinerary Added"))
    .catch((err) => res.json("Itinerary Already Added"));
});

module.exports = router;
