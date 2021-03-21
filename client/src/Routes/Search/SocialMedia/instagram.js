import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./instagram.css";

import { addressName } from "../searchBarResults/socialMediaSlice";

// Sample pics
import pic1 from "../../../Assets/bangkok.jpg";
import pic2 from "../../../Assets/hotels.jpg";
import pic3 from "../../../Assets/nyc.jpg";

export const Instagram = ({ click }) => {
  const images = [pic1, pic2, pic3];
  const [index, setIndex] = useState(0);
  const [currentPic, setCurrentPics] = useState(images[index]);
  const [scrapeData, setScrapeData] = useState([]);

  let address = useSelector(addressName);

  const onFetchScrape = async () => {
    try {
      let fetchRes = await fetch(`/instagram/${address}`, {
        method: "GET",
      });
      let fetchJson = await fetchRes.json();
      setScrapeData(fetchJson["instaPosts"][0]);
    } catch (err) {
      console.log(err);
    }
  };

  const onSlide = (e) => {
    if (e.target.className === "left") {
      if (index > 0) setIndex(index - 1);
      else setIndex(images.length - 1);
      setCurrentPics(images[index]);
    }
    if (e.target.className === "right") {
      if (index < images.length - 1) {
        setIndex(index + 1);
      } else setIndex(0);
      setCurrentPics(images[index]);
    }
  };

  useEffect(() => {
    if (address !== undefined) onFetchScrape();
  }, [address]);

  console.log(scrapeData);

  return (
    <div className="Instagram">
      <div className="arrows">
        <div className="left" onClick={onSlide}>
          ❮
        </div>
        <div className="right" onClick={onSlide}>
          ❯
        </div>
      </div>
      <div
        className="insta_pic"
        style={{ backgroundImage: `url(${currentPic})` }}
      ></div>
    </div>
  );
};
