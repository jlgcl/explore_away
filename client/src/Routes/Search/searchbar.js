import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./searchbar.css";

import { searchSubmitted } from "./searchSlice";
import { DropDown } from "./dropDown";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();

  const onInputChange = (e) => setInput(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (input) dispatch(searchSubmitted(input));

    setInput("");
  };

  const fetchCities = async () => {
    try {
      let fetchRes = await fetch("/cityList", { method: "GET" });
      let fetchJson = await fetchRes.json();
      setCities(fetchJson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="SearchBar">
      <form className="SearchBar_Form">
        <div className="SearchBar_Container">
          <input
            className="Search_Input"
            placeholder="Enter Travel Destination"
            type="text"
            onChange={onInputChange}
          ></input>
          <DropDown cities={cities} input={input} />
        </div>
        <input
          type="submit"
          className="Search_Submit"
          value="&#x1F50D;"
          onClick={onSubmit}
        ></input>
      </form>
    </div>
  );
};

export default SearchBar;
