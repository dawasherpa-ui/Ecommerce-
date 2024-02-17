import React, { createContext, useContext, useState } from 'react'

export const CartContext= createContext()
function Store({children}) {
    const [productId,setProductId]=useState([])
    const addProduct = (id) => {
      setProductId((prevProductId) => [...prevProductId, id]);
    };
  return (
    <CartContext.Provider value={{ productId:productId,addProduct:addProduct }}>
    {children}
  </CartContext.Provider>
  )
}

export default Store
