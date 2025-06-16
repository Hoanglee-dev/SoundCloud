"use client";
import React from "react";
import Slider from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const NextArrow = (props: any) => {
  return (
    <Button
      variant="outlined"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        top: "45%",
        zIndex: 2,
        right: "0",
        minWidth: "5px",
        border: "1px solid #ccc",
        padding: "0 5px",
      }}
    >
      <ChevronRight />
    </Button>
  );
};

const PrevArrow = (props: any) => {
  return (
    <Button
      variant="outlined"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        top: "45%",
        zIndex: 2,
        minWidth: "5px",
        border: "1px solid #ccc",
        padding: "0 5px",
      }}
    >
      <ChevronLeft />
    </Button>
  );
};
const MainSlider = () => {
  let settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        margin: "0 50px",
        ".items": {
          padding: " 0 10px",
        },
        ".item-track": {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px",
        },
      }}
    >
      <h2>Multiple tracks</h2>
      <Slider {...settings}>
        <div className="items">
          <h3 className="item-track">1</h3>
        </div>
        <div className="items">
          <h3 className="item-track">2</h3>
        </div>
        <div className="items">
          <h3 className="item-track">3</h3>
        </div>
        <div className="items">
          <h3 className="item-track">4</h3>
        </div>
        <div className="items">
          <h3 className="item-track">5</h3>
        </div>
        <div className="items">
          <h3 className="item-track">6</h3>
        </div>
      </Slider>
    </Box>
  );
};

export default MainSlider;
