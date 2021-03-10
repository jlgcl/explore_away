// TODO: create results component w/ SearchMap change location feature. Use Redux for state management.

import React from "react";
import Searcher from "./searcher";
import SearchMap from "./searchmap";
import "./search.css";

const Search = () => {
  return (
    <div className="Search">
      <div className="Searcher">
        <Searcher />
      </div>
      <div className="SearchMap">
        <SearchMap />
      </div>
    </div>
  );
};

export default Search;
