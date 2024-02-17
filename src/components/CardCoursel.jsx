import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};
function CardCoursel({ datas }) {
  const cardData = {
    title: "Product",
    description: "Premium IPhone15+...",
    image: "https://source.unsplash.com/random/?Iphone/",
  };
  return (
    <Box>
      <Carousel responsive={responsive}>
        {datas.map((e) => (
          <Box key={e}>
            <Card data={cardData} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default CardCoursel;
