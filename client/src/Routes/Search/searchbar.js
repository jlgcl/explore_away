import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./searchbar.css";

import { searchSubmitted } from "./searchSlice";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const onInputChange = (e) => setInput(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (input) dispatch(searchSubmitted(input));

    setInput("");
  };

  return (
    <div className="SearchBar">
      <form className="SearchBar_Form">
        <input
          className="Search_Input"
          placeholder="Enter Travel Destination"
          type="text"
          onChange={onInputChange}
        ></input>
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
