import React from 'react'
import {Box} from "@mui/material"
import Card from './Card'
function Table({list}) {
  const cardData={
    "title": "Title of the Card",
    "description": "Description of the Card",
    "image": "URL_of_the_image"
  }
  const tableList=["1","2","3","4","5","6","7","8"]
  return (
    <Box sx={{display:"grid",gridTemplateColumns:{xs:"repeat(3,1fr)",sm:"repeat(4,1fr)",md:"repeat(4,1fr)",lg:"repeat(5,1fr)",}}}>
      {tableList.map((e)=>
      <Box key={e}>
        <Card data={cardData}/>
      </Box>)}
    </Box>
  )
}

export default Table
