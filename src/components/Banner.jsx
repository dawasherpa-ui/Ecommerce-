import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BannerCard from './BannerCard';

function Banner({ productName, productId }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/search?name=${productName.slice(0,4)}&page=1&limit=30`, { method: 'GET' });
        const data = await response.json();

        if (data?.search > 1) {
          const updatedProducts = data.user.filter((obj) => obj._id !== productId);
          setProducts(updatedProducts);
        } else {
          // If product not found, fetch all products
          const allProductsResponse = await fetch('https://ecommerce-backend-9354.onrender.com/api/product/search?page=1&limit=30', { method: 'GET' });
          const allProductsData = await allProductsResponse.json();
          const updatedProducts=allProductsData.user.filter((obj)=> obj._id !==productId);
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [productName, productId]);

  return (
    <Box>
      <Typography variant='h4' sx={{ fontSize: { md: "22px" }, mb: 1 }}>Relative Product</Typography>
      {products && products.map((product, index) => (
        <Box key={index} sx={{ px: 1 }}>
          <BannerCard bannerCard={product} />
        </Box>
      ))}
    </Box>
  );
}

export default Banner;
