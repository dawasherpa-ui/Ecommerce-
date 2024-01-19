import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ProductImg from "../assets/offer/cardproduct.jpg";

function Product() {
  const id = useParams();
  console.log(id.id);
  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Product
      </Typography>
      <Box
        sx={{
          display: "grid",
          my: 3,
          gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" },
          gap: { xs: "10px" },px:2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            justifyContent: "flex-start",
            width: { xs: "100%", sm: "90%" },
            order:"1"
          }}
        >
          <img
            style={{ width: "100%", borderRadius: "5px", objectFit: "cover" }}
            src={ProductImg}
            alt="Productimg"
          />
        </Box>
        <Box sx={{order:{xs:"3",sm:"2"}}}>
          <Box>
            <Typography variant="h4">Details</Typography>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Typography variant="body1">
              <Typography variant="h6">Price : $1999</Typography>
            </Typography>
            <Typography variant="body1">
              <Typography variant="h6">In Stock : 100</Typography>
            </Typography>
            <Typography variant="body1">
              <Typography variant="h6">Sold Out: 58</Typography>
            </Typography>
            <Typography variant="body1">
              <Typography variant="h6">Ratings: 9.8</Typography>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ gridColumn: { xs: "1/2", sm: "1/3" },order:{xs:"2",sm:"3"} }}>
          <Typography variant="h5">IPhone15Plus</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
