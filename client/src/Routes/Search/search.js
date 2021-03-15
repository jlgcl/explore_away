import React from "react";
import Searcher from "./searcher";
import SearchMap from "./SearchMap/searchmap";
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
