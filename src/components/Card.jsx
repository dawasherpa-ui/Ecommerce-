import { Alert, Box, Paper, Snackbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
export default function Card({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Paper
        elevation={3}
        sx={{ p: 1, m: { xs: "5px", sm: 1 }, bgcolor: "background.default" }}
      >
        <Link to="/shop/123" style={{ textDecoration: "none" }}>
          <Box sx={{ color: "text.primary" }}>
            <Box
              sx={{
                height: { xs: "30vw", sm: "25vw", md: "19vw" },
              }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={data.image}
                alt="Card Image"
              />
            </Box>
            <Typography
              variant="subtitle"
              sx={{ fontSize: { sm: "16px" }, fontWeight: "bold" }}
            >
              {data.title}
            </Typography>
            <Typography variant="h5" sx={{ fontSize: { md: "18px" } }}>
              Rs.20,000
            </Typography>
          </Box>
        </Link>
       <Typography variant="h6" sx={{ fontSize: { md: "16px" } }}>See more..</Typography>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
        >
          Added To Cart
        </Alert>
      </Snackbar>
    </div>
  );
}
