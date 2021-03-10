import React, { useState } from "react";
import "./searchmap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

import { selectSearch } from "../Search/searchSlice";

const SearchMap = () => {
  const [coordinate, setCoordinate] = useState([51.505, -0.09]);

  const searchInput = useSelector(selectSearch);

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
