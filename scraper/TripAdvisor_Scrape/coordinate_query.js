const fetch = require("node-fetch");

// fetch lat/lon coordinates of corresponding address from nominatim.openstreetmap
const coordinateQuery = async (address) => {
  const fetchData = await fetch(
    "https://nominatim.openstreetmap.org/search?format=json&q=" + address
  );
  const jsonData = await fetchData.json();

  // screen for undefined coordinate results
  if (jsonData[0] !== undefined) return [jsonData[0].lat, jsonData[0].lon];
  else return null;
};

module.exports = coordinateQuery;
