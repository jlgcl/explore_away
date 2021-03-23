import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./youtube.css";

import { addressName } from "../searchBarResults/socialMediaSlice";

export const YouTube = () => {
  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState([
    "https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif",
  ]);
  const [title, setTitle] = useState([]);

  let address = useSelector(addressName);

  const onFetchScrape = async () => {
    try {
      let fetchRes = await fetch(`/youtube/${address}`, {
        method: "GET",
      });
      let fetchJson = await fetchRes.json();
      setVideo([]);
      fetchJson["items"].map((data) => {
        setVideo((current) => [
          ...current,
          `https://youtube.com/embed/${data["id"]["videoId"]}`,
        ]);
        setTitle((current) => [...current, data["snippet"]["title"]]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSlide = (e) => {
    if (e.target.className === "yt_left") {
      if (index > 0) setIndex(index - 1);
      else setIndex(video.length - 1);
    }
    if (e.target.className === "yt_right") {
      if (index < video.length - 1) {
        setIndex(index + 1);
      } else setIndex(0);
    }
  };

  useEffect(() => {
    if (address !== undefined) onFetchScrape();
  }, [address]);

  return (
    <div className="YouTube">
      <iframe
        className="yt_player"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={video[index]}
        title={title[index]}
      ></iframe>
      <div className="yt_arrows">
        <div className="yt_left" onClick={onSlide}>
          ❮
        </div>
        <div className="yt_right" onClick={onSlide}>
          ❯
        </div>
      </div>
    </div>
  );
};
