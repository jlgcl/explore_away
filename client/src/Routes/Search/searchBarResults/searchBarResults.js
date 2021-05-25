import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./searchBarResults.css";

import { selectAddresses } from "../SearchMap/addressSlice";
import {
  addressSelected,
  addressClicked,
  addressClickStatus,
} from "./socialMediaSlice";

const SearchBarResults = () => {
  let addresses = useSelector(selectAddresses); // all addresses
  let clickStatus = useSelector(addressClickStatus); // for social media window view toggle
  let dispatch = useDispatch();

  let attractionsRef = useRef();
  let restaurantsRef = useRef();
  let hotelsRef = useRef();

  const onAddressClick = (e) => {
    dispatch(addressSelected(e.target.textContent));
    if (clickStatus === false) dispatch(addressClicked(true));
  };

  // helper for onHeaderClick function
  const headerClickHandler = (addressRef) => {
    if (addressRef.current.style.maxHeight === "0px")
      addressRef.current.style.maxHeight = "500px";
    else addressRef.current.style.maxHeight = "0px";
  };

  const onHeaderClick = (e) => {
    switch (e.target.textContent) {
      case "Attractions":
        headerClickHandler(attractionsRef);
        break;
      case "Restaurants":
        headerClickHandler(restaurantsRef);
        break;
      case "Hotels":
        headerClickHandler(hotelsRef);
        break;
      default:
        throw new Error();
    }
  };

  let attractionsRender, restaurantsRender, hotelsRender;

  const renderHandler = (addresses, classInput) => {
    return addresses.map((address) => (
      <div className={classInput} key={address} onClick={onAddressClick}>
        {address}
      </div>
    ));
  };

  // check for 'undefined' Redux state
  if (
    addresses["attractions"][0] !== undefined &&
    addresses["restaurants"][0] !== undefined &&
    addresses["hotels"][0] !== undefined
  ) {
    attractionsRender = renderHandler(
      addresses["attractions"][0],
      "address_attractions"
    );
    restaurantsRender = renderHandler(
      addresses["restaurants"][0],
      "address_restaurants"
    );
    hotelsRender = renderHandler(addresses["hotels"][0], "address_hotels");
  }

  return (
    <div className="searchBarResults">
      <div className="category">
        <div className="header" onClick={onHeaderClick}>
          Attractions
        </div>
        <div className="address_list" ref={attractionsRef}>
          {attractionsRender}
        </div>
      </div>
      <div className="category">
        <div className="header" onClick={onHeaderClick}>
          Restaurants
        </div>
        <div className="address_list" ref={restaurantsRef}>
          {restaurantsRender}
        </div>
      </div>
      <div className="category">
        <div className="header" onClick={onHeaderClick}>
          Hotels
        </div>
        <div className="address_list" ref={hotelsRef}>
          {hotelsRender}
        </div>
      </div>
    </div>
  );
};

export default SearchBarResults;
