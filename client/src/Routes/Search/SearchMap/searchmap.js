import React, { useState, useEffect } from "react";
import "./searchmap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { ChangeView } from "./ChangeView";
import { POI } from "./poi";

import {
  fetchedAttractions,
  fetchedRestaurants,
  fetchedHotels,
} from "./addressSlice";
import { selectSearch } from "../searchSlice";
import { addressName } from "../SocialMedia/socialMediaSlice";

const SearchMap = () => {
  const [coordinate, setCoordinate] = useState([51.5, -0.12]);
  const [searchInput, setSearchInput] = useState("London");
  const [addresses, setAddresses] = useState(null);
  const [attractionsCoordinates, setAttractionsCoordinates] = useState([]);
  const [restaurantsCoordinates, setRestaurantsCoordinates] = useState([]);
  const [hotelsCoordinates, setHotelsCoordinates] = useState([]);
  const [centerPosition, setCenterPosition] = useState(coordinate);

  const searchInputState = useSelector(selectSearch);
  const centerAddress = useSelector(addressName);
  const dispatch = useDispatch();

  const fetchCityCoordinate = async () => {
    try {
      let fetchReq = await fetch(`/tripadvisor/${searchInput}`, {
        method: "GET",
      });
      let fetchJson = await fetchReq.json();
      setCoordinate(fetchJson["coordinate"]);
      setAddresses(fetchJson);
      // dispatch all the fetched addresses & coordinates to Redux store
      dispatch(fetchedAttractions(fetchJson["attractions"]["addressList"]));
      dispatch(fetchedRestaurants(fetchJson["restaurants"]["addressList"]));
      dispatch(fetchedHotels(fetchJson["hotels"]["addressList"]));

      setAttractionsCoordinates(fetchJson["attractions"]["coordinates"]);
      setRestaurantsCoordinates(fetchJson["restaurants"]["coordinates"]);
      setHotelsCoordinates(fetchJson["hotels"]["coordinates"]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchInputState !== undefined) setSearchInput(searchInputState);
  }, [searchInputState]);

  useEffect(() => {
    if (searchInput !== undefined) fetchCityCoordinate();
  }, [searchInput]);

  // TODO: need to update to coordinate, not address name

  useEffect(() => {
    if (centerAddress !== undefined) {
      let attractionsFind = attractionsCoordinates.filter(
        (address) => address[0] === centerAddress
      );
      let restaurantsFind = restaurantsCoordinates.filter(
        (address) => address[0] === centerAddress
      );
      let hotelsFind = hotelsCoordinates.filter(
        (address) => address[0] === centerAddress
      );
      console.log(attractionsFind[0], restaurantsFind[0], hotelsFind[0]);
      if (attractionsFind[0] !== undefined)
        setCenterPosition(attractionsFind[0][1]);
      else if (restaurantsFind[0] !== undefined)
        setCenterPosition(restaurantsFind[0][1]);
      else if (hotelsFind[0] !== undefined) setCenterPosition(hotelsFind[0][1]);
    }
  }, [
    centerAddress,
    attractionsCoordinates,
    restaurantsCoordinates,
    hotelsCoordinates,
  ]);

  // map of Markers based on attractions list
  return (
    <div className="SearchMap_Main">
      <MapContainer center={coordinate} zoom={13} scrollWheelZoom={true}>
        <ChangeView center={centerPosition} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <POI coordinate={coordinate} addresses={addresses} />
      </MapContainer>
    </div>
  );
};

export default SearchMap;
