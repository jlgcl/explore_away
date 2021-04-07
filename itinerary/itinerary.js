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

router.post("/api/delete_itinerary", async (req, res) => {
  let username = req.body.username;
  let city = req.body.city;
  let address = req.body.address;
  let address_type = req.body.address_type;
  let time = req.body.time;

  pool.query(
    "DELETE FROM daily_itinerary WHERE username=$1 AND city=$2 AND address=$3 AND address_type=$4 AND time=$5",
    [username, city, address, address_type, time]
  );
});

router.post("/api/get_itinerary", async (req, res) => {
  let username = req.body.username;
  let {
    rows,
  } = await pool.query(
    "SELECT city, address, address_type, time FROM daily_itinerary WHERE username=$1",
    [username]
  );

  // group itineraries by date
  const groups = rows.reduce((groups, item) => {
    const date = item.time.split(", ")[0]; // obtain the first half of the splitted item (date)
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item); // push itinerary to the groups accumulator's date key
    return groups;
  }, {});

  // new return array format
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      itineraries: groups[date],
    };
  });

  res.json(groupArrays);
});

module.exports = router;
