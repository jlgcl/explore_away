import React, { useState, useEffect, useRef } from "react";
import Searcher from "./searcher";
import SearchMap from "./SearchMap/searchmap";
import "./search.css";
import "./Loading/searchLoading.css";

import { SocialScrape } from "./SocialMedia/socialScrape";
import { SearchLoading } from "./Loading/searchLoading";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef();
  const searcherRef = useRef();

  useEffect(() => {
    if (loading === false) loadingRef.current.style.display = "none";
    else loadingRef.current.style.display = "block";
  }, [loading]);

  return (
    <div className="Search">
      <div className="SearchLoading" ref={loadingRef}>
        <SearchLoading />
      </div>
      <div className="Searcher" ref={searcherRef}>
        <Searcher searcherRef={searcherRef} />
      </div>
      <div className="SearchMap">
        <SearchMap setLoading={setLoading} />
      </div>
      <SocialScrape />
    </div>
  );
};

export default Search;
