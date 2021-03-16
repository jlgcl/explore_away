import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

import { markerIcon } from "./icon";

// Map over the list of attractions and show through popup; accept as props: coordinate, attraction list
export const POI = ({ coordinate, addresses }) => {
  const [attractions, setAttractions] = useState([
    ["London Center", [51.50558625, -0.090487028540277]],
  ]);
  const [restaurants, setRestaurants] = useState([
    ["London Center", [51.50558625, -0.090487028540277]],
  ]);
  const [hotels, setHotels] = useState([
    ["London Center", [51.50558625, -0.090487028540277]],
  ]);

  useEffect(() => {
    if (addresses !== null) {
      setAttractions(addresses["attractions"]["coordinates"]);
      setRestaurants(addresses["restaurants"]["coordinates"]);
      setHotels(addresses["hotels"]["coordinates"]);
    }
  }, [addresses]);

  const restaurantIcon = new markerIcon({
    iconUrl:
      "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/cafe-512.png",
  });
  const hotelIcon = new markerIcon({
    iconUrl:
      "https://icon-library.com/images/hotel-map-icon/hotel-map-icon-14.jpg",
  });
  const attractionIcon = new markerIcon({
    iconUrl: "https://cdn3.iconfinder.com/data/icons/map/500/landmark-512.png",
  });

  let attractionsRender = attractions.map((address) => (
    <Marker position={address[1]} key={address[0]} icon={attractionIcon}>
      <Popup>{address[0]}</Popup>
    </Marker>
  ));
  let restaurantsRender = restaurants.map((address) => (
    <Marker position={address[1]} key={address[0]} icon={restaurantIcon}>
      <Popup>{address[0]}</Popup>
    </Marker>
  ));
  let hotelsRender = hotels.map((address) => (
    <Marker position={address[1]} key={address[0]} icon={hotelIcon}>
      <Popup>{address[0]}</Popup>
    </Marker>
  ));

  return (
    <div>
      {attractionsRender} {restaurantsRender} {hotelsRender}
    </div>
  );
};
