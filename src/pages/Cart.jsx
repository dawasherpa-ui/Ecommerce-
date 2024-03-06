import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/Store";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
function Cart() {
  const { productId, setProductId } = useContext(CartContext);

  const handleRemoveCart = (id) => {
    // Create a new array without the object to maintain data immutability
    const updatedProductId = productId.filter((item) => item._id !== id);
  
    // Update the context using the provided setProductId function
    setProductId(updatedProductId);
  
    // Optional: Update local storage (avoid modifying local storage here)
    // localStorage.setItem('cart', JSON.stringify(updatedProductId));
  };
  return (
    <Box>
      <Box sx={{display:"flex", justifyContent:"center",alignItems:"center",mt:1}}>
      <Typography variant="h2" sx={{ fontSize: { md: "36px" },textAlign:"center" }}>
         Cart
      </Typography>
      <ShoppingCartIcon sx={{fontSize:{xs:"5.5vw",sm:"3.3vw",md:"36px"}}}/>
      </Box>
      {productId.length > 0 ? (
        <List>
          {productId.map((e,i)=><ListItem key={i}>
            <Link to={`/shop/${e._id}`} style={{textDecoration:"none"}}>
            <Box sx={{display:"flex",gap:"10px",justifyContent:"center",alignItems:"center"}}>
              <Box sx={{width:{xs:"15vw",sm:"80px",md:"100px"},height:{xs:"15vw",sm:"80px",md:"100px"}}}><img src={`https://ldgnpdudaohjifgktmst.supabase.co/storage/v1/object/public/ruza/${e._id}`} alt="Cart Image" style={{height:"100%",width:"100%",objectFit:"cover",borderRadius:"4px"}}/></Box>
              <Box sx={{display:"flex",flexDirection:"column"}}>
              <Typography variant="subtitle" sx={{color:"text.primary",fontSize:{sm:"16px"},fontWeight:"bold",textTransform:"capitalize"}}>{e.name}</Typography>
              <Typography variant="h5" sx={{color:"text.primary",fontSize:{md:"18px"}}}>$ {e.price}</Typography>
              </Box>
              <Box sx={{marginLeft:"20px"}}>
                <Button variant="contained">Buy</Button>
                <Button sx={{ml:1,color:""}} variant="outlined" onClick={()=>handleRemoveCart(e._id)}>Remove</Button>
              </Box>
            </Box>
            </Link>
            </ListItem>)}
        </List>
      ) : (
        "Empty Cart"
      )}
    </Box>
  );
}

export default Cart;
