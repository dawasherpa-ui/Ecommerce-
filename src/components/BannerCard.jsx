import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
function BannerCard({bannerCard}) {
  return (
      <Link to={`/shop/${bannerCard._id}`} style={{textDecoration:"none"}}>
    <Box sx={{display:"grid",gridTemplateColumns:"2fr 4fr"}}>
      <Box>
        <img src={`https://ldgnpdudaohjifgktmst.supabase.co/storage/v1/object/public/ruza/${bannerCard._id}`} style={{width:"100%",borderRadius:"4px"}} alt="Banner" />
      </Box>
      <Box sx={{pl:1,display:"flex",flexDirection:"column"}}>
        <Typography variant='subtitle' sx={{ fontSize: { sm: "16px" },color:"text.primary", fontWeight: "bold",textTransform:"capitalize" }}>{bannerCard.name.slice(0,12)}...</Typography>
        <Typography variant="subtitle" sx={{  fontSize: { sm: "16px" },color:"text.primary"  }}>$ {bannerCard.price}</Typography>
      </Box>
    </Box>
      </Link>
  )
}

export default BannerCard
