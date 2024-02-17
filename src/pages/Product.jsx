import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import GrainIcon from "@mui/icons-material/Grain";
import ProductImg from "../assets/offer/cardproduct.jpg";
import Snackbar from "@mui/material/Snackbar";
import { CartContext } from "../context/Store";
function Product() {
  const id = useParams();
  const { addProduct } = useContext(CartContext);
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
    <Box>
      <Box role="presentation" sx={{ my: 1 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            style={{ display: "flex", textDecoration: "none", alignItems: "center" }}
            to="/"
          >
            <HomeIcon sx={{ mr: 0.5, color: "text.primary" }} fontSize="inherit" />
            <Typography variant="subtitle" sx={{ "&:hover": { textDecoration: "underline" }, color: "text.primary", fontSize: { md: "18px" } }}>Home</Typography>
          </Link>
          <Link
            style={{ display: "flex", textDecoration: "none", alignItems: "center" }}
            to="/shop"
          >
            <StoreIcon sx={{ mr: 0.5, color: "text.primary" }} fontSize="inherit" />
            <Typography variant="subtitle" sx={{ "&:hover": { textDecoration: "underline" }, color: "text.primary", fontSize: { md: "18px" } }}>Shop</Typography>
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            <Typography variant="subtitle" sx={{ fontSize: { md: "18px" } }}>{id.id}</Typography>
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "grid",
          my: 3,
          gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" },
          gap: { xs: "10px" },
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            justifyContent: "flex-start",
            width: { xs: "100%", sm: "90%" },
            order: "1",
          }}
        >
          <img
            style={{ width: "100%", borderRadius: "5px", objectFit: "cover" }}
            src={ProductImg}
            alt="Productimg"
          />
        </Box>
        <Box sx={{ order: { xs: "3", sm: "2" } }}>
          <Box>
            <Link to="/user/1222" style={{ textDecoration: "none" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: "2px", md: "5px" } }}>
                <Avatar sx={{ width: { xs: "35px", sm: "45px", md: "50px" }, height: { xs: "35px", sm: "45px", md: "50px" } }} src="https://source.unsplash.com/random/?avatar/" />
                <Typography variant="h5" sx={{ fontSize: { md: "18px" }, color: "text.primary" }}>Store</Typography>
              </Box>
            </Link>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontSize: { md: "22px" }, marginTop: 1 }}>Details</Typography>
            <Box sx={{ paddingLeft: 1, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <Typography variant="h6" sx={{ fontSize: { md: "18px" }, fontWeight: "400" }}>Price :Rs 20,000</Typography>
              <Typography variant="h6" sx={{ fontSize: { md: "18px" }, fontWeight: "400" }}>In Stock : 100</Typography>
              <Typography variant="h6" sx={{ fontSize: { md: "18px" }, fontWeight: "400" }}>Sold Out: 58</Typography>
              <Typography variant="h6" sx={{ fontSize: { md: "18px" }, fontWeight: "400" }}>Delivery :Rs 100</Typography>
            </Box>
            <Box sx={{ paddingLeft: 1, display: "flex", gap: "10px", marginTop: { xs: 1, md: 2 } }}>
              <Button variant="contained">Buy</Button>
              <Button
                variant="contained"
                onClick={() => {
                  addProduct(id.id);
                  handleClick();
                }}
              >
                Cart
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            gridColumn: { xs: "1/2", sm: "1/3" },
            order: { xs: "2", sm: "3" },
            display: "flex", flexDirection: "column", gap: "10px"
          }}
        >
          <Typography variant="h5">IPhone15Plus</Typography>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Chip label="Mobile" variant="outlined" sx={{ fontSize: { xs: "2vw", sm: "1.5vw", md: "14px" }, height: "auto", paddingBlock: { xs: "1vw", sm: "5px" } }} />
            <Chip label="Technology" variant="outlined" sx={{ fontSize: { xs: "2vw", sm: "1.5vw", md: "14px" }, height: "auto", paddingBlock: { xs: "1vw", sm: "5px" } }} />
            <Chip label="IPhone15Pro" variant="outlined" sx={{ fontSize: { xs: "2vw", sm: "1.5vw", md: "14px" }, height: "auto", paddingBlock: { xs: "1vw", sm: "5px" } }} />
          </Box>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Added To Cart
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Product;
