import React, { useState, useEffect } from "react";
import "./Home.css";
import itinerary from "../Assets/itinerary.png";
import travel_search from "../Assets/travel_search.jpeg";
import travel_plan from "../Assets/travel_plan.jpg";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home_Search">
        <div
          className="Home_Picture"
          style={{
            backgroundImage: `url(${travel_search})`,
          }}
          alt="test"
        ></div>
        <div className="Home_Header">Search Locations</div>
        <div className="Home_Subsection">
          Search travel locations and explore top attractions
        </div>
      </div>
      <div className="Home_Travel_Plan">
        <div className="Home_Header">Create Travel Plan</div>
        <div className="Home_Subsection">
          Create a travel plan for the city that you want to explore
        </div>
        <div
          className="Home_Picture"
          style={{
            backgroundImage: `url(${travel_plan})`,
          }}
        />
      </div>
      <div className="Home_Itinerary">
        <div
          className="Home_Picture"
          style={{
            backgroundImage: `url(${itinerary})`,
          }}
        />
        <div className="Home_Header">Create Daily Itinerary</div>
        <div className="Home_Subsection">
          Create a daily itinerary for the city that you travel
        </div>
      </div>
    </div>
  );
};

export default Home;
