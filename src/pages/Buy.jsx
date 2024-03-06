import React from 'react'
import { useParams } from 'react-router-dom'

function Buy() {
    const product_id=useParams().id
  return (
    <h2>
     Comming Soon. Still in Progress
    </h2>
  )
}

export default Buy
