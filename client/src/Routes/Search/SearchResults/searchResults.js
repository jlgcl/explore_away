import React from "react";

const SearchResults = () => {
  // select the current city from Redux store
  //let currentCity = useSelector(selectSearch);

  return (
    <div className="SearchResults">
      <div className="Attractions"></div>
      <div className="Restaurants"></div>
      <div className="Hotels"></div>
    </div>
  );
};

export default SearchResults;
