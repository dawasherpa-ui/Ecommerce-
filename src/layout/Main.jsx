import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/Product'

export default function Main() {
  return (
    <Box sx={{px:{xs:"20px",sm:"30px",md:"50px"}}}>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/shop/:id' element={<Product/>}/>
      </Routes>
    </Box>
  )
}
