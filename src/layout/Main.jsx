import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Shop from '../pages/Shop'
import Product from '../pages/Product'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'

export default function Main() {
  return (
    <Box component="main" sx={{px:{xs:"20px",sm:"30px",md:"50px"}}}>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/shop' element={<Shop/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signin' element={<SignIn/>}/>
      <Route exact path='/cart' element={<Cart/>}/>
      <Route exact path='/shop/:id' element={<Product/>}/>
      <Route exact path='/user/:id' element={<Profile/>}/>
      </Routes>
    </Box>
  )
}
