import React, { useState, useEffect } from "react";
import "./daily_itinerary.css";

const DailyItinerary = () => {
  const [username, setUsername] = useState(localStorage.getItem("user"));
  const [fetchData, setFetchData] = useState([{ date: "", itineraries: [""] }]);

  const onFetchItinerary = async () => {
    let data = { username: username };
    let fetchRes = await fetch("/get_itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let fetchJson = await fetchRes.json();
    setFetchData(fetchJson);
  };

  /// Itinerary render ///
  let renderItems = fetchData.map((group) => (
    <div className="itinerary_item" key={group["date"]}></div>
  ));

  useEffect(() => {
    if (username === undefined || username === null) {
      alert("You must be logged in");
      window.location.href = "/";
    } else onFetchItinerary();
  }, []);

  console.log(fetchData);

  return (
    <div className="daily_itinerary">
      <div className="itinerary_top">
        <div className="itinerary_header"></div>
      </div>
      <div className="itinerary_title">{username}'s Daily Itinerary</div>
      <div className="itinerary_items">{renderItems}</div>
    </div>
  );
};

export default DailyItinerary;
