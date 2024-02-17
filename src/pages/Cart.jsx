import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/Store";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
function Cart() {
  const { productId } = useContext(CartContext);
  return (
    <Box>
      <Typography variant="h2" sx={{ fontSize: { md: "36px" },textAlign:"center" }}>
        Cart
      </Typography>
      {productId.length > 0 ? (
        <List>
          {productId.map((e,i)=><ListItem key={i}>
            <Box sx={{display:"flex",gap:"10px",justifyContent:"center",alignItems:"center"}}>
              <Box sx={{width:{xs:"15vw",sm:"80px",md:"100px"},height:{xs:"15vw",sm:"80px",md:"100px"}}}><img src="https://source.unsplash.com/random/?Laptop/" alt="Cart Image" style={{height:"100%",width:"100%",objectFit:"cover"}}/></Box>
              <Box sx={{display:"flex",flexDirection:"column"}}>
              <Typography variant="subtitle" sx={{fontSize:{sm:"16px"},fontWeight:"bold"}}>Product{e}</Typography>
              <Typography variant="h5" sx={{fontSize:{md:"18px"}}}>Rs 20,000</Typography>
              </Box>
              <Box sx={{marginLeft:"20px"}}>
                <Button variant="contained">Buy</Button>
              </Box>
            </Box>
            </ListItem>)}
        </List>
      ) : (
        "Empty Cart"
      )}
    </Box>
  );
}

export default Cart;
