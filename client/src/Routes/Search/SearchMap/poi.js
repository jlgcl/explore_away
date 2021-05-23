import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

import { markerIcon } from "./icon";

// Map over the list of attractions and show through popup; accept as props: coordinate, attraction list
export const POI = ({ addresses }) => {
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

  const renderMarkers = (addresses, icon) => {
    return addresses.map((address) => (
      <Marker position={address[1]} key={address[0]} icon={icon}>
        <Popup>{address[0]}</Popup>
      </Marker>
    ));
  };

  let attractionsRender = renderMarkers(attractions, attractionIcon);
  let restaurantsRender = renderMarkers(restaurants, restaurantIcon);
  let hotelsRender = renderMarkers(hotels, hotelIcon);

  return (
    <div>
      {attractionsRender} {restaurantsRender} {hotelsRender}
    </div>
  );
};
