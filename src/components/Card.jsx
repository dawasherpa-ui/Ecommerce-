import {  Box, Paper,  Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export default function Card({ data }) {
  return (
    <div>
      <Paper
        elevation={3}
        sx={{ bgcolor: "background.default" }}
      >
        <Link to={`/shop/${data._id}`} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                height: { xs: "30vw", sm: "25vw", md: "19vw" },
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover",borderRadius:"4px 4px 0px 0px" }}
                src={`https://ldgnpdudaohjifgktmst.supabase.co/storage/v1/object/public/ruza/${data._id}`}
                alt={`Image of ${data.name}`}
              />
            </Box>
            <Box sx={{px:1,pb:1, color: "text.primary" }}>
            <Typography
              variant="subtitle"
              sx={{ fontSize: { sm: "16px" }, fontWeight: "bold",textTransform:"capitalize" }}
            >
              {data.name.slice(0,12)}...
            </Typography>
            <Typography variant="h5" sx={{ fontSize: { md: "18px" } }}>
              ${data.price}
            </Typography>
       <Typography variant="h6" sx={{ fontSize: { md: "16px" } ,color:"text.primary"}}>See more...</Typography>
          </Box>
        </Link>
      </Paper>
    </div>
  );
}
