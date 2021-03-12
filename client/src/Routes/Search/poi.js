import React from "react";
import { Marker, Popup } from "react-leaflet";

// Map over the list of attractions and show through popup; accept as props: coordinate, attraction list
export const POI = ({ coordinate }) => {
  return (
    <Marker position={coordinate}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};
