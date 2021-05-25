import React, { useState } from "react";
import SearchBar from "./searchbar";

const Searcher = ({ searcherRef }) => {
  const [showSearch, setShowSearch] = useState(true);

  let toggleArrow;

  if (showSearch === true) {
    toggleArrow = "❮";
  } else {
    toggleArrow = "❯";
  }

  const handleToggle = (e) => {
    if (showSearch === true) {
      setShowSearch(false);
      searcherRef.current.style.left = "-25vw";
      searcherRef.current.style.transition = "left 0.3s";
    } else {
      setShowSearch(true);
      searcherRef.current.style.left = "0";
      searcherRef.current.style.transition = "left 0.3s";
    }
  };

  return (
    <div className="Searcher_Main">
      <SearchBar />
      <div className="ToggleSearchBar" onClick={handleToggle}>
        {toggleArrow}
      </div>
    </div>
  );
};

export default Searcher;
