import React, { useState, useEffect } from "react";
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

  let address = useSelector(addressName);
  let addresses = useSelector(selectAddresses);
  let address_type;
  let city = useSelector(selectSearch);

  const findAddressType = () => {
    if (
      addresses["attractions"][0].find((item) => item === address) !== undefined
    )
      address_type = "attractions";
    if (
      addresses["restaurants"][0].find((item) => item === address) !== undefined
    )
      address_type = "restaurants";
    if (addresses["hotels"][0].find((item) => item === address) !== undefined)
      address_type = "hotels";
  };

  const onAddItinerary = async (e) => {
    findAddressType();
    let data = {
      username: localStorage.getItem("user"),
      address: address,
      city: city,
      address_type: address_type,
      time: date.v[0].toLocaleString(),
    };

    console.log(JSON.stringify(data));

    await fetch("/add_itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  console.log(addresses["attractions"][0]);

  useEffect(() => {
    if (
      localStorage.getItem("user") === undefined ||
      localStorage.getItem("user") === null
    ) {
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
  }, []);

  return <div className="itinerary_add">{renderContent}</div>;
};
