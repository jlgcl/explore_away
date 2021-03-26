import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./instagram.css";
import "../Loading/searchLoading.css";

import { SocialLoading } from "../Loading/socialLoading";
import { addressName } from "../searchBarResults/socialMediaSlice";

export const Instagram = () => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [postImg, setPostImg] = useState([
    "https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif",
  ]);
  const [postTime, setPostTime] = useState([]);
  const [postCaption, setPostCaption] = useState([]);

  let loadingRef = useRef();

  let address = useSelector(addressName);

  const onFetchScrape = async () => {
    setLoading(true);
    try {
      let fetchRes = await fetch(`/instagram/${address}`, {
        method: "GET",
      });
      let fetchJson = await fetchRes.json();
      setLoading(false);
      setPostImg([]);
      setPostTime([]);
      setPostCaption([]);
      fetchJson["instaPosts"][0].map((data) => {
        setPostImg((current) => [...current, data["imgSrc"]]);
        setPostTime((current) => [...current, data["timeStamp"]]);
        setPostCaption((current) => [...current, data["caption"]]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSlide = (e) => {
    if (e.target.className === "left") {
      if (index > 0) setIndex(index - 1);
      else setIndex(postImg.length - 1);
    }
    if (e.target.className === "right") {
      if (index < postImg.length - 1) {
        setIndex(index + 1);
      } else setIndex(0);
    }
  };

  useEffect(() => {
    if (address !== undefined) onFetchScrape();
  }, [address]);

  useEffect(() => {
    if (loading === false) loadingRef.current.style.display = "none";
    else loadingRef.current.style.display = "block";
  });

  return (
    <div className="Instagram">
      <div className="SocialLoading" ref={loadingRef}>
        <SocialLoading />
      </div>
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
        style={{ backgroundImage: `url(${postImg[index]})` }}
      ></div>
      <div className="insta_description">
        <div className="insta_timestamp">{postTime[index]}</div>
        <div className="insta_caption">{postCaption[index]}</div>
      </div>
    </div>
  );
};
