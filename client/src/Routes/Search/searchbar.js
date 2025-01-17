import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./searchbar.css";
import { DropDown } from "./DropDown/dropDown";
import SearchBarResults from "./searchBarResults/searchBarResults";
import backArrow from "../../Assets/backarrow.png";

import { searchSubmitted } from "./searchSlice";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState([]);
  const [selectionInput, setSelectionInput] = useState("");

  const searchInputRef = useRef();

  const dispatch = useDispatch();

  const onInputChange = (e) => setInput(e.target.value);

  const fetchCities = async () => {
    try {
      let fetchRes = await fetch("/cityList", { method: "GET" });
      let fetchJson = await fetchRes.json();
      setCities(fetchJson);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // dispatch the submitted input only if the input matches one of the fetched cities
    // selected input from dropdown & complete input
    if (cities.find((city) => city === selectionInput))
      dispatch(searchSubmitted(selectionInput));
    if (cities.find((city) => city === input)) dispatch(searchSubmitted(input));

    setInput("");
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // change input field value to the dropdown selection
  useEffect(() => {
    searchInputRef.current.value = selectionInput;
  }, [selectionInput]);

  return (
    <div className="SearchBar">
      <a className="Search_Back_Container" href="/">
        <img className="Search_Back" src={backArrow} alt="back"></img>
      </a>
      <form className="SearchBar_Form">
        <div className="SearchBar_Container">
          <input
            className="Search_Input"
            placeholder="Enter Travel Destination"
            type="text"
            onChange={onInputChange}
            ref={searchInputRef}
          ></input>
          <DropDown
            cities={cities}
            input={input}
            setSelectionInput={setSelectionInput}
          />
        </div>
        <input
          type="submit"
          className="Search_Submit"
          value="&#x1F50D;"
          onClick={onSubmit}
        ></input>
      </form>
      <SearchBarResults />
    </div>
  );
};

export default SearchBar;
