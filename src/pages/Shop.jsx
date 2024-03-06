import React, { memo, useEffect, useState } from 'react'
import Coursel from '../components/Coursel'
import { Box, Paper, Typography } from '@mui/material'
import CardCoursel from '../components/CardCoursel'
import Table from '../components/Table'
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function Home() {
  const [products,setProducts]=useState([])

  const handleProduct=async()=>{
    const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/`,{method:'GET'})
    const data= await response.json();
    const updatedProducts = data.map((product) => ({
      ...product, // Spread existing properties
      image: `https://source.unsplash.com/random/?laptop/`, // Add new key-value pair
    }));
    setProducts(updatedProducts);
  }
    useEffect(() => {
      handleProduct();
    }, []);
  return (
    <div>
      <Coursel component={["https://www.digiantmedia.com/wp-content/uploads/2020/08/ecommerce-website-development-offer.jpg","https://cf.shopee.com.my/file/0bbfbf1471a624dc05913877250fd94e","https://th.bing.com/th/id/R.a3a354e927de17b8e4a936fda96a2898?rik=vLXMrvodUatOpw&riu=http%3a%2f%2fwww.qaadar.com%2fpublic%2fuploads%2fall%2f9EsBZkYAFcHgCuQ4YllBTWjuMTZBtn38AkDz7R67.jpg&ehk=Q21lXlxhY4ywUdBTNry3WsaEQmoka7euqy2xJntt0js%3d&risl=&pid=ImgRaw&r=0","https://dtbtob4osa700.cloudfront.net/MallImages/04052023152223259_mallban.jpg"]}/>
      <Paper sx={{p:2,mt:1}}>
      <Typography variant='h4' sx={{fontSize:{md:"28px"},fontWeight:"bold",mb:"2px"}}>New Products</Typography>
      <Table list={products&&products.slice(0,5)}/>
      </Paper>
      {products.length>5&&<Paper elevation={8} sx={{p:{xs:1,sm:2},my:1,}}>
        <Box sx={{display:"flex",px:1}}>
        <Typography variant='h4' sx={{color:"text.secondary",fontWeight:"bold"}}>Hot Deals</Typography><WhatshotIcon sx={{fontSize:{xs:"4vw",sm:"3vw"}}}/>
        </Box>
      <CardCoursel datas={products&&products.slice(5,11)} />
      </Paper>}
      { products.length>11 &&<Paper sx={{p:2,mt:1}}><Table list={products&&products.slice(11)}/></Paper> }
    </div>
  )
}
