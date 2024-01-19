import React from 'react'
import Navbar from './layout/Navbar'
import Main from './layout/Main'
import Footer from './layout/Footer'
import { Box } from '@mui/material'

function App() {
  return (
    <Box sx={{minHeight:"100vh",minWidth:"320px",backgroundColor:"background.paper",color:"text.primary"}}>
      <Navbar/>
      <Main/>
      <Footer/>
    </Box>
  )
}

export default App
