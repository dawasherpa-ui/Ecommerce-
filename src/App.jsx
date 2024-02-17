import React from 'react'
import Navbar from './layout/Navbar'
import Main from './layout/Main'
import Footer from './layout/Footer'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'


function App() {
  const path =useLocation()
  return (
    <Box sx={{minHeight:"100vh",minWidth:"320px",backgroundColor:"background.default",color:"text.primary"}}>
      <Navbar/>
      <Main/>
      <Footer/>
    </Box>
  )
}

export default App
