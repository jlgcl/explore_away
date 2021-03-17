import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./searchBarResults.css";

import { selectAddresses } from "../SearchMap/addressSlice";

const SearchBarResults = () => {
  let addresses = useSelector(selectAddresses);

  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);

  let attractionsRender, restaurantsRender, hotelsRender;

  useEffect(() => {
    if (addresses !== undefined) {
      setAttractions(addresses["attractions"][0]);
      setRestaurants(addresses["restaurants"][0]);
      setHotels(addresses["hotels"][0]);
    }
  }, [addresses]);

  // check for 'undefined' Redux state
  if (
    attractions !== undefined &&
    restaurants !== undefined &&
    hotels !== undefined
  ) {
    attractionsRender = attractions.map((address) => (
      <div className="address" key={address}>
        {address}
      </div>
    ));
    restaurantsRender = restaurants.map((address) => (
      <div className="address" key={address}>
        {address}
      </div>
    ));
    hotelsRender = hotels.map((address) => (
      <div className="address" key={address}>
        {address}
      </div>
    ));
  }

  console.log(attractions);

  return (
    <div className="searchBarResults">
      <div className="category">
        <div className="header">Attractions</div>
        <div className="address_list">{attractionsRender}</div>
      </div>
      <div className="category">
        <div className="header">Restaurants</div>
        <div className="address_list">{restaurantsRender}</div>
      </div>
      <div className="category">
        <div className="header">Hotels</div>
        <div className="address_list">{hotelsRender}</div>
      </div>
    </div>
  );
};

export default SearchBarResults;
