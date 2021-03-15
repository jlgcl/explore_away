// STATUS: loading while fetching: initial load required upon page load

import React, { useState, useEffect } from "react";
import "./searchmap.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { ChangeView } from "./ChangeView";
import { POI } from "./poi";

import { selectSearch } from "../searchSlice";

const SearchMap = () => {
  const [coordinate, setCoordinate] = useState([51.5, -0.12]);
  const [searchInput, setSearchInput] = useState("London");
  const [addresses, setAddresses] = useState(null);

  const searchInputState = useSelector(selectSearch);

  const fetchCityCoordinate = async () => {
    try {
      let fetchReq = await fetch(`/tripadvisor/${searchInput}`, {
        method: "GET",
      });
      let fetchJson = await fetchReq.json();
      setCoordinate(fetchJson["coordinate"]);
      setAddresses(fetchJson);
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

  console.log(addresses);

  // map of Markers based on attractions list
  return (
    <div className="SearchMap_Main">
      <MapContainer center={coordinate} zoom={13} scrollWheelZoom={true}>
        <ChangeView center={coordinate} zoom={13} />
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
