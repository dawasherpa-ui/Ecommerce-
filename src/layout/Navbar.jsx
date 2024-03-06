import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
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
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/Store";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {user,logoutUser,setSnackMessage}=useContext(CartContext)
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(null);
  const [datas, setDatas] = useState([]);
  const [controller, setController] = useState(null);
  const navigate=useNavigate()
  const location=useLocation();
  const handleOpen=()=>{
    setOpen(!open)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  
  const handleSearch = async () => {
    if (controller) {
      controller.abort(); // Abort previous request if exists
    }

    const newController = new AbortController();
    setController(newController);

    try {
      const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/search?name=${search}&page=1&limit=30`, {
        method: "GET",
        signal: newController.signal
      });

      const data = await response.json();
      if (data?.search !== 0) {
        setDatas(data.user);
        console.log(data.user);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Previous request aborted');
      } else {
        console.log('Error fetching data:', err);
      }
    }
  }

  useEffect(() => {
    if (search.length > 1) {
      handleSearch();
    }
  }, [search]);

  const searchClick=()=>{    
    setShow(false)
    navigate(`/search/${search}`)  
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
        bgcolor: "background.paper",
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
              border: "1px solid white",
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
            <Link style={{color:"white",textDecoration:"none"}} to="/publish">
              <ListItemButton>
                <PostAddIcon sx={{ fontSize: "20px" }} />
                Publish
              </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Box>
     <Box sx={{display:"flex",gap:{xs:"0px",sm:"10px"},alignItems:"center"}}>
     {location.pathname=="/"?null:
     <FormControl sx={{position:"relative",minWidth:"100px",maxWidth:"300px"}}>
       <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>
      <Input
         sx={{height:"30px",fontSize:{xs:"3.5vw",sm:"17px",md:"18px",lg:"20px"}, "&:before": { borderBottom: "1px solid white" }}}
         onChange={(e) => { setSearch(e.target.value.toLowerCase()) }}
         onClick={() => { setShow(true) }}
         onBlur={() => { setShow(false) }}
         value={search}
          endAdornment={<InputAdornment position="end">
           <IconButton onClick={(e) => { search.length>3?(e.stopPropagation(),searchClick()):null }}>
            <SearchIcon sx={{color:"text.primary"}}/>
          </IconButton>
        </InputAdornment>}
        />
         {show ?
            <Box sx={{ position: "absolute", zIndex: "99", top: "100%", backdropFilter: "blur(5px)", bgcolor: "rgba(0, 0, 0, 0.54)", px: 1, pb: 2, pt: 0, width: "100%" }}>
              <List sx={{ p: 0 }}>
                {search.length === 0 ? "Search to purchase" : datas.length > 0 ? datas.map((e, i) => 
                <Link to={`/shop/${e._id}`} key={i} style={{textDecoration:"none",}}   onClick={() => setShow(false)}>
                <ListItem sx={{ p: 0, pt: 1, textTransform: "capitalize",color:"text.primary" }}onMouseDown={(e) => e.preventDefault()}>
                  {e.name}
                </ListItem>
                </Link>
                ) : "Search not found"}
              </List>
            </Box> : null}
        </FormControl>}
         <Box sx={{display:{xs:"initial",md:"none"}}}>
            <IconButton sx={{color:"white"}} onClick={handleOpen}>
            <MenuIcon/>
            </IconButton>
          </Box>
        <Box>
          {user?<Button variant="contained" onClick={()=>{logoutUser();setSnackMessage("logOut")}} >LogOut</Button>:
          <Link to="/login" style={{textDecoration:"none"}}><Button variant="contained">SignIn</Button></Link>
        }
          </Box>
      </Box>
      <Drawer open={open}  onClose={handleClose}>
        <Box sx={{width:"40vw",marginTop:{xs:"70px",sm:"70px",md:"80px"},height:"100%",color:"text.primary",bgcolor:"background.default"}}>
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
            <ListItem sx={{ p: 0 }}>
            <Link style={{color:"white",textDecoration:"none"}} to="/publish">
              <ListItemButton onClick={handleClose}>
                <PostAddIcon sx={{ fontSize: "20px" }} />
                Publish
              </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
