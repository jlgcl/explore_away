import React, { useState } from "react";

const Searcher = () => {
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
      document.querySelector(".Searcher").style.left = "-25vw";
      document.querySelector(".Searcher").style.transition = "left 0.3s";
    } else {
      setShowSearch(true);
      document.querySelector(".Searcher").style.left = "0";
      document.querySelector(".Searcher").style.transition = "left 0.3s";
    }
  };

  return (
    <div>
      <div className="SearchBar">Test</div>
      <div className="ToggleSearchBar" onClick={handleToggle}>
        {toggleArrow}
      </div>
    </div>
  );
};

export default Searcher;
