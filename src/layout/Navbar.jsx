import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import Logo from "../assets/logo.jpg";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WidgetsIcon from "@mui/icons-material/Widgets";
export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const cateArray=["Bag","Clothes","Cosmetic","Beeds","Necklace"]
  const productArray=["Product1","Product2","Product3","Product4","Product5","Product6"]
  const changeProduct=(e)=>{
    setSymbol(e)
  }
  return (
    <Box
      component="header"
      sx={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.default",
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
        <Box sx={{ height: "70px" }}>
          <img
            src={Logo}
            style={{
              height: "100%",
              borderRadius: "50% 50% 46% 54% / 62% 58% 42% 38% ",
              border: "2px solid gray",
            }}
            alt="RuzaBelle"
          />
        </Box>
        <Box component="nav">
          <List sx={{ display: "flex" }}>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton>
                <HomeIcon sx={{ fontSize: "20px" }} />
                Home
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton>
                <StoreIcon sx={{ fontSize: "20px" }} />
                Shop
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton>
                <ShoppingCartIcon sx={{ fontSize: "20px" }} />
                Cart
              </ListItemButton>
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
                        gridTemplateColumns: "1fr 3fr",
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
                         <Box>
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
      <Box sx={{display:"flex"}}>
        <input
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #cfd1d6",
            width: "250px",
          }}
          placeholder="Search"
        />
        <Box>
          <Button>LogIn/SignIn</Button>
        </Box>
      </Box>
    </Box>
  );
}
