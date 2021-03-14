const express = require("express");
const router = express.Router();
const pool = require("../db/index");

router.get("/api/cityList", async (req, res) => {
  let { rows } = await pool.query("SELECT city FROM cities");

  res.json(rows);
});

module.exports = router;
