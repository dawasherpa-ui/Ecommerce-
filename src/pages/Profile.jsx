import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import Table from '../components/Table'

function Profile() {
    return (
        <Box>
            <Box className="info-box" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
                <Box sx={{ height: { xs: "160px", sm: "170px", md: "180px" }, width: "100%" }}>
                    <img src="https://source.unsplash.com/random/?background/" alt="Profile-Bg" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                </Box>
                <Box sx={{ height: { xs: "80px", sm: "120px", md: "150px" }, marginTop: { xs: "-40px", sm: "-60px", md: "-75px" }, display: "flex", flexDirection: "column", justifyItems: "center" }}>
                    <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random/?avatar/" sx={{ width: { xs: "80px", sm: "120px", md: "150px" }, height: { xs: "80px", sm: "120px", md: "150px" }, border: "2px solid black" }} />
                    <Typography variant='h4' sx={{ fontSize: { md: "22px" }, textAlign: "center" }}>Store</Typography>
                </Box>
            </Box>
            <Box className="product-box" sx={{ marginTop: { xs: "40px", sm: "60px", md: "75px" } }}>
                <Table list={["1", "2", "3", "4", "5", "6", "7", "8"]} cardData={{
                    "title": "Product",
                    "description": "Description of the Card",
                    "image": "https://source.unsplash.com/random/?earpod/"
                }} />
            </Box>
        </Box>
    )
}

export default Profile
