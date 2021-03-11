// STATUS: update map based on search input submit

import React, { useState, useEffect } from "react";
import "./searchmap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

import { selectSearch } from "../Search/searchSlice";

const SearchMap = () => {
  const [coordinate, setCoordinate] = useState([51.505, -0.09]);

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

  console.log(searchInput);

  // map of Markers based on attractions list
  return (
    <div className="SearchMap_Main">
      <MapContainer center={coordinate} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinate}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SearchMap;
