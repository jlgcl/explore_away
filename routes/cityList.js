const express = require("express");
const router = express.Router();
const pool = require("../db/index");

router.get("/api/cityList", async (req, res) => {
  let { rows } = await pool.query("SELECT city FROM cities");
  let cityList = [];

  rows.forEach((city) => cityList.push(city["city"]));

  res.json(cityList);
});

module.exports = router;
