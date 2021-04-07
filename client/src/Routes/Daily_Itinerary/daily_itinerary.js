import React, { useState, useEffect } from "react";
import "./daily_itinerary.css";

import attractionPic from "../../Assets/it_attraction.png";
import restaurantPic from "../../Assets/it_restaurant.png";
import hotelPic from "../../Assets/it_hotel.png";

const DailyItinerary = () => {
  const [username, setUsername] = useState(localStorage.getItem("user"));
  const [fetchData, setFetchData] = useState(null);
  const [renderContent, setRenderContent] = useState(null);

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

  // Set image by address type
  const backgroundImgSet = (addressType) => {
    if (addressType === "attractions")
      return (
        <div
          className="itinerary_address_type_child"
          style={{
            backgroundImage: `url(${attractionPic})`,
            backgroundColor: "rgb(255, 182, 148)",
          }}
        ></div>
      );
    if (addressType === "restaurants")
      return (
        <div
          className="itinerary_address_type_child"
          style={{
            backgroundImage: `url(${restaurantPic})`,
            backgroundColor: "rgb(192, 185, 255)",
          }}
        ></div>
      );
    if (addressType === "hotels")
      return (
        <div
          className="itinerary_address_type_child"
          style={{
            backgroundImage: `url(${hotelPic})`,
            backgroundColor: "rgb(164, 255, 187)",
          }}
        ></div>
      );
    return null;
  };

  const onDeleteItinerary = async (itinerary) => {
    let data = {
      username: localStorage.getItem("user"),
      city: itinerary.city,
      address: itinerary.address,
      address_type: itinerary.address_type,
      time: itinerary.time,
    };
    await fetch("/delete_itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    if (username === undefined || username === null) {
      alert("You must be logged in");
      window.location.href = "/";
    } else onFetchItinerary();
  }, []);

  useEffect(() => {
    if (fetchData !== null) {
      setRenderContent(
        fetchData.map((group, index) => (
          <div className="itinerary_group" key={index}>
            <div className="itinerary_group_header">{group.date}</div>
            {group.itineraries.map((itinerary, subindex) => (
              <div className="itinerary_item" key={subindex}>
                <div className="itinerary_time">
                  {itinerary.time.split(", ")[1]}
                </div>
                <div
                  className="itinerary_address_type"
                  name={itinerary.address_type}
                >
                  {backgroundImgSet(itinerary.address_type)}
                </div>
                <div className="itinerary_content">
                  <div className="itinerary_address">{itinerary.address}</div>
                  <div className="itinerary_city">{itinerary.city}</div>
                </div>
                <div
                  className="itinerary_delete"
                  onClick={() => {
                    onDeleteItinerary(itinerary);
                    window.location.href = "/daily_itinerary";
                  }}
                >
                  Delete
                </div>
              </div>
            ))}
          </div>
        ))
      );
    }
  }, [fetchData]);

  return (
    <div className="daily_itinerary">
      <div className="itinerary_top">
        <div className="itinerary_header"></div>
      </div>
      <div className="itinerary_title">{username}'s Daily Itinerary</div>
      <div className="itinerary_items">{renderContent}</div>
    </div>
  );
};

export default DailyItinerary;
