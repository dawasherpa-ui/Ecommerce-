import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import Image1 from "../assets/offer/product.jpg";
export default function Card({ data }) {
  return (
    <div>
      <Paper elevation={3} sx={{ p: 1, m: 1 }}>
        <img style={{ width: "100%" }} src={Image1} alt="Card Image" />
        <Typography variant="h5">{data.title}</Typography>
        <Typography>{data.description}</Typography>
        <Box sx={{display:"flex",justifyContent:"space-around"}}>
          <Button variant="contained">Buy</Button>
          <Button variant="contained">Add to Cart</Button>
        </Box>
      </Paper>
    </div>
  );
}
