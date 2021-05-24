import React, { useState, useEffect, useCallback } from "react";
import "./daily_itinerary.css";

import attractionPic from "../../Assets/it_attraction.png";
import restaurantPic from "../../Assets/it_restaurant.png";
import hotelPic from "../../Assets/it_hotel.png";

const DailyItinerary = () => {
  const [fetchData, setFetchData] = useState(null);
  const [renderContent, setRenderContent] = useState(null);
  const [user, setUser] = useState();

  const onFetchItinerary = async () => {
    let fetchRes = await fetch("/get_itinerary", {
      method: "GET",
    });
    let fetchJson = await fetchRes.json();
    setFetchData(fetchJson);
  };

  const bgImgSetHelper = useCallback((addressType) => {
    switch (addressType) {
      case "attractions":
        return (
          <div
            className="itinerary_address_type_child"
            style={{
              backgroundImage: `url(${attractionPic})`,
              backgroundColor: "rgb(255, 182, 148)",
            }}
          ></div>
        );
      case "restaurants":
        return (
          <div
            className="itinerary_address_type_child"
            style={{
              backgroundImage: `url(${restaurantPic})`,
              backgroundColor: "rgb(255, 182, 148)",
            }}
          ></div>
        );
      case "hotels":
        return (
          <div
            className="itinerary_address_type_child"
            style={{
              backgroundImage: `url(${hotelPic})`,
              backgroundColor: "rgb(255, 182, 148)",
            }}
          ></div>
        );
      default:
        return "test";
    }
  }, []);

  // Set image by address type
  const backgroundImgSet = useCallback(
    (addressType) => bgImgSetHelper(addressType),
    [bgImgSetHelper]
  );

  const onDeleteItinerary = useCallback(
    async (itinerary) => {
      let data = {
        username: user,
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
    },
    [user]
  );

  const renderHandler = useCallback(() => {
    return fetchData.map((group, index) => (
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
    ));
  }, [fetchData, onDeleteItinerary, backgroundImgSet]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let fetchRes = await fetch("/user", {
          method: "GET",
          credentials: "include",
        });
        let fetchJson = await fetchRes.json();
        setUser(fetchJson["username"]);
        onFetchItinerary();
      } catch (err) {
        alert("You must be logged in");
        setTimeout(function () {
          window.location.href = "/";
        }, 1000);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (fetchData !== null) {
      setRenderContent(renderHandler());
    }
  }, [fetchData, renderHandler]);

  return (
    <div className="daily_itinerary">
      <div className="itinerary_top">
        <div className="itinerary_header"></div>
      </div>
      <div className="itinerary_title">{user}'s Daily Itinerary</div>
      <div className="itinerary_items">{renderContent}</div>
    </div>
  );
};

export default DailyItinerary;
