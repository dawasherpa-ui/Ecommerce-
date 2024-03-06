import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { useParams } from 'react-router-dom';

function Profile() {
    const id=useParams()
    const [products,setProducts]=useState([]);
    const [ownerData, setOwnerData] = useState(null)
    const findOwner=async(id)=>{
        try{
          const userData=await fetch(`https://ecommerce-backend-9354.onrender.com/api/user/${id}`, { method: "GET" });
          const data = await userData.json()
          data?.search !== 0? setOwnerData(data):setOwnerData(false)
        }catch(err){
          console.log(err)
        }
      }
      useEffect(()=>{
        findOwner(id.id)
      },[products])
    const handleProduct=async()=>{
        const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/user/${id.id}`,{method:'GET'})
        const data= await response.json();
        const updatedProducts = data.map((product) => ({
          ...product, // Spread existing properties
          image: `https://source.unsplash.com/random/?laptop/`, // Add new key-value pair
        }));
        setProducts(updatedProducts);
      }
        useEffect(() => {
          handleProduct();
        }, [id]);
    return (
        <Box>
            <Box className="info-box" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
                <Box sx={{ height: { xs: "160px", sm: "170px", md: "180px" }, width: "100%" }}>
                    <img src="https://source.unsplash.com/random/?background/" alt="Profile-Bg" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                </Box>
                <Box sx={{ height: { xs: "80px", sm: "120px", md: "150px" }, marginTop: { xs: "-40px", sm: "-60px", md: "-75px" }, display: "flex", flexDirection: "column", justifyItems: "center" }}>
                    <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random/?avatar/" sx={{ width: { xs: "80px", sm: "120px", md: "150px" }, height: { xs: "80px", sm: "120px", md: "150px" }, border: "2px solid black" }} />
                    <Typography variant='h4' sx={{ fontSize: { md: "22px" }, textAlign: "center",textTransform:"capitalize" }}>{`${ownerData?.firstName} ${ownerData?.lastName}`}</Typography>
                </Box>
            </Box>
            <Box className="product-box" sx={{ marginTop: { xs: "40px", sm: "60px", md: "75px" } }}>
                <Table list={products&&products} />
            </Box>
        </Box>
    )
}

export default Profile
