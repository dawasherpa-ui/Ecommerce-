import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
export default function Card({ data }) {
  return (
    <div>
      <Paper elevation={3} sx={{ p: 1, m: {xs:"5px",sm:1} }}>
        <Box sx={{}}>
        <img style={{ width: "100%" }} src={data.image} alt="Card Image" />
        </Box>
        <Typography variant="subtitle" sx={{fontSize:{sm:"16px"},fontWeight:"bold"}}>{data.title}</Typography>
        <Typography variant="h5" sx={{fontSize:{md:"18px"}}}>Rs.20,000</Typography>
        <Box sx={{display:"flex",justifyContent:"space-around"}}>
          <Button variant="contained">Buy</Button>
          <Button variant="contained">Add to Cart</Button>
        </Box>
      </Paper>
    </div>
  );
}
