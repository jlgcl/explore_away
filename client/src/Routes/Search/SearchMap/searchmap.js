import React, { useState, useEffect, useCallback } from "react";
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
import { addressName } from "../searchBarResults/socialMediaSlice";

const SearchMap = ({ setLoading }) => {
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

  // fetch coordinates & addresses
  const memoFetchCoordinate = useCallback(async () => {
    setLoading(true);
    try {
      let fetchReq = await fetch(`/tripadvisor/${searchInput}`, {
        method: "GET",
      });
      let fetchJson = await fetchReq.json();

      setLoading(false);

      setCoordinate(fetchJson["coordinate"]);
      setCenterPosition(fetchJson["coordinate"]);
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
  }, [searchInput, dispatch, setLoading]);

  // when individual address is clicked, update center position
  const memoCenterPos = useCallback(() => {
    const handleCenterPos = (coordinates) => {
      let findPosition = coordinates.filter(
        (address) => address[0] === centerAddress
      );
      if (findPosition[0] !== undefined) setCenterPosition(findPosition[0][1]);
    };
    handleCenterPos(attractionsCoordinates);
    handleCenterPos(restaurantsCoordinates);
    handleCenterPos(hotelsCoordinates);
  }, [
    attractionsCoordinates,
    restaurantsCoordinates,
    hotelsCoordinates,
    centerAddress,
  ]);

  useEffect(() => {
    if (searchInputState !== undefined) setSearchInput(searchInputState);
  }, [searchInputState]);

  useEffect(() => {
    if (searchInput !== undefined) memoFetchCoordinate();
  }, [searchInput, memoFetchCoordinate]);

  // for social media address selection
  useEffect(() => {
    memoCenterPos();
  }, [centerAddress, memoCenterPos]);

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
