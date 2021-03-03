import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import itinerary from "../Assets/itinerary.png";
import travel_search from "../Assets/travel_search.jpeg";
import travel_plan from "../Assets/travel_plan.jpg";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="Home">
      <div data-aos="fade-right" className="Home_Search">
        <div className="Home_Frame">
          <div
            className="Home_Picture"
            style={{
              backgroundImage: `url(${travel_search})`,
            }}
          />
        </div>
        <div className="Home_Header">Search Locations</div>
        <div className="Home_Subsection">
          SEARCH TRAVEL LOCATIONS AND EXPLORE TOP ATTRACTIONS
        </div>
      </div>
      <div data-aos="fade-left" className="Home_Travel_Plan">
        <div className="Home_Header">Create Travel Plan</div>
        <div className="Home_Subsection">
          CREATE A TRAVEL PLAN FOR THE CITY THAT YOU WANT TO EXPLORE
        </div>
        <div className="Home_Frame">
          <div
            className="Home_Picture"
            style={{
              backgroundImage: `url(${travel_plan})`,
            }}
          />
        </div>
      </div>
      <div data-aos="fade-right" className="Home_Itinerary">
        <div className="Home_Frame">
          <div
            className="Home_Picture"
            style={{
              backgroundImage: `url(${itinerary})`,
            }}
          />
        </div>
        <div className="Home_Header">Create Daily Itinerary</div>
        <div className="Home_Subsection">
          CREATE A DAILY ITINERARY FOR THE CITY THAT YOU TRAVEL
        </div>
      </div>
    </div>
  );
};

export default Home;
