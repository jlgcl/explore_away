import React, { useEffect, useState, useCallback } from "react";

export const DropDown = ({ cities, input, setSelectionInput }) => {
  const [selections, setSelections] = useState([""]);

  const onSelectInput = (e) => {
    e.preventDefault();

    setSelectionInput(e.target.textContent);
  };

  let itemsToRender;
  if (selections) {
    itemsToRender = selections.map((selection) => {
      return (
        <li key={selection} onClick={onSelectInput}>
          {selection}
        </li>
      );
    });
  }

  const matchInput = useCallback(() => {
    let match;
    for (let i = 0; i < input.length; i++) {
      match = cities.filter((city) => input[i] === city[i]);
    }
    setSelections(match);
  }, [cities, input]);

  useEffect(() => {
    if (input !== undefined) matchInput();
  }, [input, matchInput]);

  // Display the dropdown list if input is defined & not an empty string
  useEffect(() => {
    if (selections === undefined)
      document.querySelector(".DropDown").style.display = "none";
    if (selections !== undefined) {
      if (selections[0] === "")
        document.querySelector(".DropDown").style.display = "none";
      else document.querySelector(".DropDown").style.display = "flex";
    }
  }, [selections]);

  return <div className="DropDown">{itemsToRender}</div>;
};
