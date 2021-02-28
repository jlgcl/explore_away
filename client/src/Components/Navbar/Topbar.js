import React from "react";

const Topbar = () => {
  return (
    <div className="Topbar">
      <div className="toggleBars">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
      <div className="logo" />
      <div className="Navlinks">
        <a href="/#">Home</a>
        <a href="/#">Travel Plan</a>
        <a href="/#">Daily Itinerary</a>
        <a href="/#">Map</a>
        <a href="/#">About</a>
        <a href="/#">Contact</a>
        <a href="/#">Sign In</a>
      </div>
    </div>
  );
};

export default Topbar;
