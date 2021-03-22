import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./instagram.css";

import { addressName } from "../searchBarResults/socialMediaSlice";

export const Instagram = ({ click }) => {
  const [index, setIndex] = useState(0);
  const [postImg, setPostImg] = useState([
    "https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif",
  ]);
  const [postTime, setPostTime] = useState([]);
  const [postCaption, setPostCaption] = useState([]);

  let address = useSelector(addressName);

  const onFetchScrape = async () => {
    try {
      let fetchRes = await fetch(`/instagram/${address}`, {
        method: "GET",
      });
      let fetchJson = await fetchRes.json();
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
        style={{ backgroundImage: `url(${postImg[index]})` }}
      ></div>
      <div className="insta_description">
        <div className="insta_timestamp">{postTime[index]}</div>
        <div className="insta_caption">{postCaption[index]}</div>
      </div>
    </div>
  );
};
