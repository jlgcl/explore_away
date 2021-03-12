// STATUS: loading while fetching

import React, { useState, useEffect } from "react";
import "./searchmap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { ChangeView } from "./ChangeView";
import { POI } from "./poi";

import { selectSearch } from "../Search/searchSlice";

const SearchMap = () => {
  const [coordinate, setCoordinate] = useState([51.5074, -0.1278]);

  const searchInput = useSelector(selectSearch);

  const fetchCityCoordinate = async () => {
    try {
      let fetchReq = await fetch(`/api/tripadvisor/${searchInput}`, {
        method: "GET",
      });
      let fetchJson = await fetchReq.json();
      setCoordinate(fetchJson["coordinate"]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCityCoordinate();
  }, [searchInput]);

  // map of Markers based on attractions list
  return (
    <div className="SearchMap_Main">
      <MapContainer center={coordinate} zoom={13} scrollWheelZoom={true}>
        <ChangeView center={coordinate} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <POI coordinate={coordinate} />
      </MapContainer>
    </div>
  );
};

export default SearchMap;
