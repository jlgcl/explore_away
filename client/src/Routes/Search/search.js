import React from "react";
import Searcher from "./searcher";
import SearchMap from "./SearchMap/searchmap";
import "./search.css";

import { SocialScrape } from "./SocialMedia/socialScrape";

const Search = () => {
  return (
    <div className="Search">
      <div className="Searcher">
        <Searcher />
      </div>
      <div className="SearchMap">
        <SearchMap />
      </div>
      <SocialScrape />
    </div>
  );
};

export default Search;
