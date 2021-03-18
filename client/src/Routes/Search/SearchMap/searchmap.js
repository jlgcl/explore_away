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
import { selectedAddress } from "../SocialMedia/socialMediaSlice";

const SearchMap = () => {
  const [coordinate, setCoordinate] = useState([51.5, -0.12]);
  const [searchInput, setSearchInput] = useState("London");
  const [addresses, setAddresses] = useState(null);
  const [centerPosition, setCenterPosition] = useState(coordinate);

  const searchInputState = useSelector(selectSearch);
  const centerAddress = useSelector(selectedAddress);
  const dispatch = useDispatch();

  const fetchCityCoordinate = async () => {
    try {
      let fetchReq = await fetch(`/tripadvisor/${searchInput}`, {
        method: "GET",
      });
      let fetchJson = await fetchReq.json();
      setCoordinate(fetchJson["coordinate"]);
      setAddresses(fetchJson);
      // dispatch all the fetched addresses to Redux store
      dispatch(fetchedAttractions(fetchJson["attractions"]["addressList"]));
      dispatch(fetchedRestaurants(fetchJson["restaurants"]["addressList"]));
      dispatch(fetchedHotels(fetchJson["hotels"]["addressList"]));
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
    if (centerAddress !== undefined) setCenterPosition(centerAddress);
  }, [centerAddress]);

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
