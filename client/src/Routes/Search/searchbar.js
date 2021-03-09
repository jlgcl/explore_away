import React from "react";
import "./searchbar.css";

const SearchBar = () => {
  return (
    <div className="SearchBar">
      <form className="SearchBar_Form">
        <input
          className="Search_Input"
          placeholder="Enter Travel Destination"
          type="text"
        ></input>
        <input
          type="submit"
          className="Search_Submit"
          value="&#x1F50D;"
        ></input>
      </form>
    </div>
  );
};

export default SearchBar;
