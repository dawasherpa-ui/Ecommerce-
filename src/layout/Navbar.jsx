import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import Logo from "../assets/logo.jpg";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [open, setOpen] = useState(false);
  const cateArray=["Bag","Clothes","Cosmetic","Beeds","Necklace"]
  const productArray=["Product1","Product2","Product3","Product4","Product5","Product6"]
  const changeProduct=(e)=>{
    setSymbol(e)
  }
  const location=useLocation();
  const handleOpen=()=>{
    setOpen(!open)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  return (
    <Box
      component="header"
      sx={{
        height: {xs:"70px",sm:"70px",md:"80px"},
        display: "flex",
        alignItems: "center",
        position:"sticky",
        top:"0px",
        zIndex:"9999",
        justifyContent: "space-between",
        bgcolor: "rgba(6, 6, 6, 0.9)",
        px: 4,
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box sx={{ height: {xs:"50px",sm:"60px",md:"70px"} }}>{/*Logo */}
          <Link to="/">
          <img
            src={Logo}
            style={{
              height: "100%",
              borderRadius: "50% 50% 46% 54% / 62% 58% 42% 38% ",
              border: "2px solid gray",
            }}
            alt="RuzaBelle"
          /></Link>
        </Box>
        <Box component="nav">
          <List sx={{ display: {xs:"none",md:"flex"} }}>
            <ListItem sx={{ p: 0 }}>
            <Link style={{color:"white",textDecoration:"none"}} to="/">
              <ListItemButton>
                <HomeIcon sx={{ fontSize: "20px" }} />
                Home
              </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
            <Link style={{color:"white",textDecoration:"none"}} to="/shop">
              <ListItemButton>
                <StoreIcon sx={{ fontSize: "20px" }} />
                Shop
              </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
            <Link style={{color:"white",textDecoration:"none"}} to="/cart">
              <ListItemButton>
                <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                Cart
              </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <Box sx={{ position: "relative" }}>
                <ListItemButton
                  onMouseEnter={() => {
                    setCatOpen(true);
                  }}
                  onMouseLeave={() => {
                    setCatOpen(false);
                  }}
                >
                  <WidgetsIcon sx={{ fontSize: "20px" }} />
                  Categories
                </ListItemButton>
                <Box
                  sx={{ position: "absolute", width: "auto"  ,zIndex:"99"}}
                  onMouseEnter={() => {
                    setCatOpen(true);
                  }}
                  onMouseLeave={() => {
                    setCatOpen(false);
                  }}
                >
                  {catOpen && (
                    <Paper
                      sx={{
                        bgcolor: "background.paper",
                        border: "1px solid #cfd1d6",
                        width: "350px",
                        height: "auto",
                        display: "grid",
                        zIndex:"99",
                        gridTemplateColumns: "2fr 3fr",
                        p: 1,
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          borderRight: "1px solid #cfd1d6",
                        }}
                      >
                        <List>
                         {cateArray.map((e,i)=>
                         <Box key={i}>
                          <ListItem key={i}
                           onMouseEnter={()=>changeProduct(i)}
                           >
                            {e} 
                            {symbol===i?">":null}
                            </ListItem>
                            </Box>
                         )}
                        </List>
                      </Box>
                      <Box sx={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"repeat(5,1fr)"}}>
                        <Box>Product</Box>
                        <Box>Product</Box>
                        <Box>Product</Box>
                        <Box>Product</Box>
                        <Box>Product</Box>
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Box>

     <Box sx={{display:"flex",gap:{xs:"0px",sm:"10px"},alignItems:"center"}}>
     {location.pathname=="/"?null:
     <Box sx={{minWidth:"100px",maxWidth:"300px"}}>
      <input
          style={{
            paddingBlock: "5px",
            paddingInline: "10px",
            fontSize:"15px",
            borderRadius: "4px",
            border: "1px solid #cfd1d6",
            width:"100%"
          }}
          placeholder="Search"
        />
        </Box>}
         <Box sx={{display:{xs:"initial",md:"none"}}}>
            <IconButton sx={{color:"white"}} onClick={handleOpen}>
            <MenuIcon/>
            </IconButton>
          </Box>
        <Box>
          <Link to="/login"><Button sx={{fontSize:{xs:"16px",sm:"18px"},"&:hover":{backgroundColor:"transparent",textDecoration:"underline"}}}>SignIn</Button></Link>
        </Box>
      </Box>
      <Drawer open={open} onClose={handleClose}>
        <Box sx={{width:"40vw",marginTop:{xs:"70px",sm:"70px",md:"80px"},color:"text.primary"}}>
          <List>
          <ListItem sx={{ p: 0 }}>
            <Link style={{color:"white",textDecoration:"none"}} to="/">
              <ListItemButton onClick={handleClose}>
                <HomeIcon sx={{ fontSize: "20px" }} />
                Home
              </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
            <Link style={{color:"white",textDecoration:"none"}} to="/shop">
              <ListItemButton onClick={handleClose}>
                <StoreIcon sx={{ fontSize: "20px" }} />
                Shop
              </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
            <Link style={{color:"white",textDecoration:"none"}} to="/cart">
              <ListItemButton onClick={handleClose}>
                <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                Cart
              </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
