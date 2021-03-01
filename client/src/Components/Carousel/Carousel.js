import React, { useState, useEffect } from "react";
import images from "./images";
import "./Carousel.css";

const Carousel = () => {
  let [sliderNum, setSliderNum] = useState(0);

  const slideReset = (sliderNum) => {
    if (sliderNum < 0) setSliderNum(Object.keys(images).length - 1);
    else if (sliderNum > Object.keys(images).length - 1) setSliderNum(0);
  };

  useEffect(() => {
    var rotate = setInterval(() => {
      setSliderNum(sliderNum + 1);
    }, 7000);

    return () => {
      clearInterval(rotate);
    };
  });

  useEffect(() => {
    slideReset(sliderNum);
  }, [sliderNum]);

  return (
    <div className="Carousel">
      <div
        className="Carousel_Pic"
        style={{
          backgroundImage: `url(${images[sliderNum]})`,
        }}
      ></div>
      <div
        className="Carousel_Left"
        onClick={() => setSliderNum(sliderNum - 1)}
      >
        --
      </div>
      <div
        className="Carousel_Right"
        onClick={() => setSliderNum(sliderNum + 1)}
      >
        --
      </div>
    </div>
  );
};

export default Carousel;
