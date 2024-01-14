import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from './Card';
import { Box } from '@mui/material';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items:5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};
function CardCoursel({datas}) {
    const cardData={
        "title": "IPhone15Plus",
        "description": "Premium IPhone15+...",
        "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gadgetbytenepal.com%2Fproduct%2Fiphone-15-pro%2F&psig=AOvVaw03Ce4_wBtN6Ae6K0hzaZmj&ust=1705305523917000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJDR2aW03IMDFQAAAAAdAAAAABAD"
      }
  return (
    <Box>
        <Carousel responsive={responsive}>
        {datas.map((e)=>
        <Box key={e}>
        <Card data={cardData}/>
        </Box>
        )}
        </Carousel>
    </Box>
  )
}

export default CardCoursel
