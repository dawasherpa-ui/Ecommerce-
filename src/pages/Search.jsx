import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '../components/Table'

function Search() {
    const [products,setProducts]=useState([])
    const product=useParams()

    const handleProduct=async()=>{
        const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/search?name=${product.product}&page=1&limit=30`,{method:'GET'})
        const data= await response.json();
        if (data?.search !== 0) {
            setProducts(data.user);
          }
      }
        useEffect(() => {
          handleProduct();
        }, [product]);
  return (
    <Box>
        <Box sx={{px:1,pt:2,pb:1}}>
        <Typography variant='h3' sx={{fontSize:{xs:"19px",sm:"24px",md:"26px"}}}>Search for  "{product.product}"</Typography>
        </Box>
        {products.length>0?<Table list={products&&products}/>:<Typography variant='h4'>Found 0</Typography>  }    
    </Box>
  )
}

export default Search
