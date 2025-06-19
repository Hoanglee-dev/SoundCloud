"use client";
import React from "react";
import Slider from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Hidden } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";

interface IProps {
  data: ITrackTop[];
  title: string;
}

const NextArrow = (props: any) => {
  return (
    <Button
      color="inherit"
      variant="contained"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        top: "25%",
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
      color="inherit"
      variant="contained"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        top: "25%",
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
const MainSlider = (props: IProps) => {
  const { data, title } = props;
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
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
        img: {
          display: "block",
          height: "auto",
          maxWidth: "100%",
          objectFit: "cover",
        },
      }}
    >
      <h2>{title}</h2>
      <Slider {...settings}>
        {data.map((track) => (
          <div className="items" key={track._id}>
            <img
              srcSet={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
              alt=""
            />
            <Link href={`/track/${track._id}?audio=${track.trackUrl}`}>
              <h4>{track.title}</h4>
            </Link>
            <h5 className="item-track">{track.description}</h5>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default MainSlider;
