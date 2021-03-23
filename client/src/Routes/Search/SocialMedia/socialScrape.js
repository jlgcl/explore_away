import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./socialScrape.css";

import { Instagram } from "./instagram";
import { YouTube } from "./youtube";

import {
  addressClicked,
  addressClickStatus,
} from "../searchBarResults/socialMediaSlice";

export const SocialScrape = () => {
  const socialWindow = useRef();
  const instaTab = useRef();
  const ytTab = useRef();
  const instaPage = useRef();
  const ytPage = useRef();

  let dispatch = useDispatch();

  let clickStatus = useSelector(addressClickStatus);

  // Show/hide social media page by which is clicked & activate/deactivate tab
  const onTabClick = (e) => {
    e.preventDefault();

    if (e.target.textContent === "Instagram") {
      instaPage.current.style.display = "block";
      instaTab.current.className = instaTab.current.className + " active";
      ytPage.current.style.display = "none";
      ytTab.current.className = ytTab.current.className.replace(" active", "");
    }
    if (e.target.textContent === "YouTube") {
      instaPage.current.style.display = "none";
      instaTab.current.className = instaTab.current.className.replace(
        " active",
        ""
      );
      ytPage.current.style.display = "block";
      ytTab.current.className = ytTab.current.className + " active";
    }
  };

  const onCloseClick = (e) => {
    dispatch(addressClicked(false));
  };

  useEffect(() => {
    socialWindow.current.style.display = "none";
    instaTab.current.className = instaTab.current.className + " active";
    ytPage.current.style.display = "none";
  }, []);

  useEffect(() => {
    if (clickStatus === true) socialWindow.current.style.display = "block";
    else if (clickStatus === false) socialWindow.current.style.display = "none";
  }, [clickStatus]);

  return (
    <div className="socialScrape" ref={socialWindow}>
      <div className="tabs">
        <div className="insta_tab" ref={instaTab} onClick={onTabClick}>
          Instagram
        </div>
        <div className="yt_tab" ref={ytTab} onClick={onTabClick}>
          YouTube
        </div>
        <div className="social_close" onClick={onCloseClick}>
          ✖
        </div>
      </div>
      <div className="socialMedia">
        <div className="Instagram" ref={instaPage}>
          <Instagram />
        </div>
        <div className="YouTube" ref={ytPage}>
          <YouTube />
        </div>
      </div>
    </div>
  );
};
