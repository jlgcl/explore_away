import React, { useEffect, useRef } from "react";
import "./socialScrape.css";

import { Instagram } from "./instagram";
import { YouTube } from "./youtube";

export const SocialScrape = ({ address }) => {
  const instaTab = useRef();
  const ytTab = useRef();
  const instaPage = useRef();
  const ytPage = useRef();

  // Show/hide social media page by which is clicked & activate/deactivate tab
  const onTabClick = (e) => {
    e.preventDefault();

    if (e.target.textContent === "Instagram") {
      instaPage.current.style.display = "block";
      instaTab.current.className = instaTab.current.className + " active";
      ytPage.current.style.display = "none";
      ytTab.current.className = ytTab.current.className.replace(" active", "");
    } else if (e.target.textContent === "YouTube") {
      instaPage.current.style.display = "none";
      instaTab.current.className = instaTab.current.className.replace(
        " active",
        ""
      );
      ytPage.current.style.display = "block";
      ytTab.current.className = ytTab.current.className + " active";
    }
  };

  useEffect(() => {
    instaTab.current.className = instaTab.current.className + " active";
  }, []);

  return (
    <div className="socialScrape">
      <div className="tabs">
        <div className="insta_tab" ref={instaTab} onClick={onTabClick}>
          Instagram
        </div>
        <div className="yt_tab" ref={ytTab} onClick={onTabClick}>
          YouTube
        </div>
      </div>
      <div className="socialMedia">
        <div className="Instagram" ref={instaPage}>
          <Instagram address={address} />
        </div>
        <div className="YouTube" ref={ytPage}>
          <YouTube address={address} />
        </div>
      </div>
    </div>
  );
};
