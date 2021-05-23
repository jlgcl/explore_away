import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import "./itineraryAdd.css";

import { selectAddresses } from "../SearchMap/addressSlice";
import { addressName } from "../searchBarResults/socialMediaSlice";
import { selectSearch } from "../searchSlice";

export const ItineraryAdd = () => {
  const [date, setDate] = useState(new Date());
  const [renderContent, setRenderContent] = useState("Must Be Logged In");
  const [user, setUser] = useState();
  const [addressType, setAddressType] = useState();

  let address = useSelector(addressName);
  let city = useSelector(selectSearch);
  let addresses = useSelector(selectAddresses);

  // helper function for findAddressType function
  const findAddressHandler = useCallback(
    (type) => {
      if (addresses[type][0].find((item) => item === address) !== undefined)
        setAddressType(type);
    },
    [address, addresses]
  );

  const findAddressType = useCallback(() => {
    findAddressHandler("attractions");
    findAddressHandler("restaurants");
    findAddressHandler("hotels");
  }, [findAddressHandler]);

  const onAddItinerary = useCallback(
    async (e) => {
      e.preventDefault();

      findAddressType();
      let data = {
        username: user,
        address: address,
        city: city,
        address_type: addressType,
        time: date.v[0].toLocaleString(),
      };

      let fetchRes = await fetch("/add_itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let fetchJson = await fetchRes.json();

      if (fetchJson === "Itinerary Already Added")
        alert("Itinerary Already Added");
      else alert("Itinerary Added");
    },
    [address, city, date.v, addressType, findAddressType, user]
  );

  const handleRenderContent = useCallback(() => {
    if (user === undefined) {
      setRenderContent("Must Be Logged In");
    } else {
      setRenderContent(
        <>
          <Flatpickr
            data-enable-time
            onChange={(v) => setDate({ v })}
            options={{ minDate: new Date(), dateFormat: "Y-m-d, H:i" }}
          />
          <div className="itinerary_submit" onClick={onAddItinerary}>
            Add to Itinerary
          </div>
        </>
      );
    }
  }, [onAddItinerary, user]);

  useEffect(() => {
    const fetchUser = async () => {
      let fetchUser = await fetch("/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      });
      let fetchJson = await fetchUser.json();
      setUser(fetchJson.username);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    handleRenderContent();
  }, [handleRenderContent]); // inject three states to update the render contents & relevant states inside add itinerary functions

  return <div className="itinerary_add">{renderContent}</div>;
};
