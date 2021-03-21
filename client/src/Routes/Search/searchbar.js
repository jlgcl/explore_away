import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./searchbar.css";

import { searchSubmitted } from "./searchSlice";
import { DropDown } from "./DropDown/dropDown";
import SearchBarResults from "./searchBarResults/searchBarResults";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState([]);
  const [selectionInput, setSelectionInput] = useState("");

  const dispatch = useDispatch();

  const onInputChange = (e) => setInput(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    // dispatch the submitted input only if the input matches one of the fetched cities
    if (cities.find((city) => city === selectionInput))
      dispatch(searchSubmitted(selectionInput));
    if (cities.find((city) => city === input)) dispatch(searchSubmitted(input));

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

  // change input field value to the dropdown selection
  useEffect(() => {
    document.querySelector(".Search_Input").value = selectionInput;
  }, [selectionInput]);

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
