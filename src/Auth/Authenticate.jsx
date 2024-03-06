import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/Store'
import { Navigate } from 'react-router-dom';

function Authenticate({children}) {
  const {user}=useContext(CartContext)
  
  if (user){
    return children;
  } else if(user !==false){
    return <Navigate to="/login" replace/>;
  } 
}

export default Authenticate
