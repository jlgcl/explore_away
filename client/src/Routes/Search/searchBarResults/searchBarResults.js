import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./searchBarResults.css";

import { selectAddresses } from "../SearchMap/addressSlice";
import { addressSelected } from "../SocialMedia/socialMediaSlice";

const SearchBarResults = () => {
  let addresses = useSelector(selectAddresses);
  let dispatch = useDispatch();

  let attractionsRef = useRef();
  let restaurantsRef = useRef();
  let hotelsRef = useRef();

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

  const onAddressClick = (e) => {
    dispatch(addressSelected(e.target.textContent));
  };

  const onHeaderClick = (e) => {
    if (e.target.textContent === "Attractions") {
      if (attractionsRef.current.style.maxHeight === "0px")
        attractionsRef.current.style.maxHeight = "500px";
      else attractionsRef.current.style.maxHeight = "0px";
    }
    if (e.target.textContent === "Restaurants") {
      if (restaurantsRef.current.style.maxHeight === "0px")
        restaurantsRef.current.style.maxHeight = "500px";
      else restaurantsRef.current.style.maxHeight = "0px";
    }
    if (e.target.textContent === "Hotels") {
      console.log(hotelsRef.current.style.maxHeight);
      if (hotelsRef.current.style.maxHeight === "0px")
        hotelsRef.current.style.maxHeight = "500px";
      else hotelsRef.current.style.maxHeight = "0px";
    }
  };

  // check for 'undefined' Redux state
  if (
    attractions !== undefined &&
    restaurants !== undefined &&
    hotels !== undefined
  ) {
    attractionsRender = attractions.map((address) => (
      <div
        className="address_attractions"
        key={address}
        onClick={onAddressClick}
      >
        {address}
      </div>
    ));
    restaurantsRender = restaurants.map((address) => (
      <div
        className="address_restaurants"
        key={address}
        onClick={onAddressClick}
      >
        {address}
      </div>
    ));
    hotelsRender = hotels.map((address) => (
      <div className="address_hotels" key={address} onClick={onAddressClick}>
        {address}
      </div>
    ));
  }

  return (
    <div className="searchBarResults">
      <div className="category">
        <div className="header" onClick={onHeaderClick}>
          Attractions
        </div>
        <div className="address_list" ref={attractionsRef}>
          {attractionsRender}
        </div>
      </div>
      <div className="category">
        <div className="header" onClick={onHeaderClick}>
          Restaurants
        </div>
        <div className="address_list" ref={restaurantsRef}>
          {restaurantsRender}
        </div>
      </div>
      <div className="category">
        <div className="header" onClick={onHeaderClick}>
          Hotels
        </div>
        <div className="address_list" ref={hotelsRef}>
          {hotelsRender}
        </div>
      </div>
    </div>
  );
};

export default SearchBarResults;
