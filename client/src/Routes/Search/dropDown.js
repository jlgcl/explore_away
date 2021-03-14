// STATUS: drop down list & disable submit until user selects an option from the list.
// must remove keys from cities to match the city w/ input
// error: Objects are not valid as React child? used JSON.stringify? but need to verify after addressing above

import React, { useEffect, useState } from "react";

export const DropDown = ({ cities, input }) => {
  const [selections, setSelections] = useState([
    "London",
    "New York City",
    "Berlin",
  ]);

  //   let itemsToRender;
  //   if (selections) {
  //     itemsToRender = selections.map((selection) => {
  //       return <li key={selection}>{selection}</li>;
  //     });
  //   }

  const matchInput = () => {
    let match;
    for (let i = 0; i < input.length; i++) {
      match = JSON.stringify(
        cities.filter((city) => input[i] === city["city"][i])
      );
    }
    setSelections(match);
  };

  useEffect(() => {
    matchInput();
  }, [input]);

  console.log(selections);

  return <div className="DropDown">temp</div>;
};
