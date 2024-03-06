import React from 'react'
import {Box} from "@mui/material"
import Card from './Card'
function Table({list}) {
  return (
    <Box sx={{display:"grid",gridTemplateColumns:{xs:"repeat(2,1fr)",sm:"repeat(3,1fr)",md:"repeat(4,1fr)",lg:"repeat(5,1fr)"},gap: { xs: "5px", sm: "10px" }}}>
      {list.map((e,i)=>
      <Box key={i}>
        <Card data={e}/>
        </Box>
)}
    </Box>
  )
}

export default Table
