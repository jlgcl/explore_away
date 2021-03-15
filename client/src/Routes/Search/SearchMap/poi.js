// Status: 'zip' or combined map of list & coordinates for map render.

import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

// Map over the list of attractions and show through popup; accept as props: coordinate, attraction list
export const POI = ({ coordinate, addresses }) => {
  const [attractionsList, setAttractionsList] = useState([]);
  // initial state 'London' or something else
  const [attractionsCoord, setAttractionsCoord] = useState([
    ["51.4993619", "-0.12739984672471022"],
    ["51.496510900000004", "-0.17600190725447445"],
    ["51.5022017", "-0.12934905177837924"],
    ["51.51929365", "-0.12801772178494725"],
    ["51.50558625", "-0.090487028540277"],
    ["13.2904027", "108.4265113"],
    ["51.51378715", "-0.09845055141832956"],
    ["51.50888405", "-0.1283741501862351"],
    ["51.5054985", "-0.0753581"],
    ["51.5080898", "-0.07620836346036469"],
  ]);
  const [attractionsMap, setAttractionsMap] = useState([]);

  useEffect(() => {
    if (addresses !== null) {
      setAttractionsList(addresses["attractions"]["addressList"]);
      setAttractionsCoord(addresses["attractions"]["coordinates"]);
    }
  }, [addresses]);

  console.log(attractionsCoord);

  let attractionsRender = attractionsCoord.map((coordinate) => (
    <Marker position={coordinate} key={coordinate}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  ));

  return <div>{attractionsRender}</div>;
};
