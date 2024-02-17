import React from 'react'
import {Box} from "@mui/material"
import { Link } from 'react-router-dom'
import Card from './Card'
function Table({list,cardData}) {
  return (
    <Box sx={{display:"grid",gridTemplateColumns:{xs:"repeat(2,1fr)",sm:"repeat(3,1fr)",md:"repeat(4,1fr)",lg:"repeat(5,1fr)",}}}>
      {list.map((e)=>
      <Box key={e}>
        <Card data={cardData}/>
        </Box>
)}
    </Box>
  )
}

export default Table
