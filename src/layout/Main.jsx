import { Alert, Box, Container, Paper, Snackbar, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Shop from '../pages/Shop'
import Product from '../pages/Product'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'
import Authenticate from '../Auth/Authenticate'
import Publish from '../pages/Publish'
import Search from '../pages/Search'
import { CartContext } from '../context/Store';
import Buy from '../pages/Buy'
import NotFoundPage from '../pages/NotFoundPage'
export default function Main() {
  const {snackMessage,setSnackMessage}=useContext(CartContext)
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect( ()=>{
    if (snackMessage=="expired"){
      handleClick()
      setAlertVariant("error")
      setAlertMessage("Your token has expired. Please log in again.")
    }else if(snackMessage=="logedIn"){
      handleClick()
      setAlertMessage("Logged In Successfully!")
    }else if(snackMessage=="logOut"){
      handleClick()
      setAlertMessage("Logged Out Safely")
    }
    else if(snackMessage=="invalid"){
      handleClick()
      setAlertVariant("error")
      setAlertMessage("Invalid Password")
    }else if(snackMessage=="published"){
      handleClick()
      setAlertMessage("The Product has been Published")
    }
  },[snackMessage])
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setSnackMessage(null)
    setAlertVariant("success")
  };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <Box component="main" sx={{px:{xs:"20px",sm:"30px",md:"50px"}}}>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/shop' element={<Shop/>}/>
      <Route exact path='/publish' element={<Authenticate><Publish/></Authenticate>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/buy/:id' element={<Buy/>}/>
      <Route exact path='/signin' element={<SignIn/>}/>
      <Route exact path='/cart' element={<Cart/>}/>
      <Route exact path='/shop/:id' element={<Product/>}/>
      <Route exact path='/user/:id' element={<Profile/>}/>
      <Route exact path='/search/:product' element={<Search/>}/>
      <Route path='*' element={<NotFoundPage/>} />
      </Routes>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertVariant}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
    </Box>
  )
}
