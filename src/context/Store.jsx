import React, { createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext()
function Store({ children }) {
  const [productId, setProductId] = useState([])
  const [user, setUser] = useState(false)
  const [signal, setSignal] = useState(false)
  const [snackMessage, setSnackMessage] = useState(null)
  function hasId(jsonArray, targetId) {
    return jsonArray.some(obj => obj._id === targetId);
  }
  const addProduct = async(id) => {
    if (await hasId(productId, id._id)) {
      console.log('Already in cart')
    }else{
    setProductId((prevProductId) => [...prevProductId, id]);}
  };
  const storedCart = localStorage.getItem("cart")
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...productId]))
  }, [productId])
  useEffect(() => {
    if (storedCart) {
      setProductId(JSON.parse(storedCart))
    } else {
      setProductId([])
    }
  }, [])
  const authUser = (token) => {
    const userInfo = {
      auth: token?.auth,
      firstName: token.firstName,
      lastName: token.lastName,
      id: token.id
    };
    const userInfoJsonString = JSON.stringify(userInfo);
    localStorage.setItem("userInfo", userInfoJsonString);
    setUser(userInfo)
  }
  const logoutUser = () => {
    localStorage.removeItem("userInfo"); // Remove user info from local storage
    setUser(null); // Set user state to null
  };
  const storedUserInfoJsonString = localStorage.getItem("userInfo");
  useEffect(() => {
    if (storedUserInfoJsonString) {
      setSignal(true)
    } else {
      setSignal(false)
      setUser(false)
    }
  }, [])
  useEffect(() => {
    const storedUserInfo = JSON.parse(storedUserInfoJsonString);
    setUser(storedUserInfo)
  }, [signal])
  return (
    <CartContext.Provider value={{ productId: productId, addProduct: addProduct, user: user, authUser: authUser, logoutUser, snackMessage, setSnackMessage,setProductId }}>
      {children}
    </CartContext.Provider>
  )
}

export default Store
