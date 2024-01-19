import React from 'react'
import Coursel from '../components/Coursel'
import { Paper, Typography } from '@mui/material'
import CardCoursel from '../components/CardCoursel'
import Table from '../components/Table'

export default function Home() {
  return (
    <div>
      <Coursel component={["https://www.digiantmedia.com/wp-content/uploads/2020/08/ecommerce-website-development-offer.jpg","https://cf.shopee.com.my/file/0bbfbf1471a624dc05913877250fd94e","https://th.bing.com/th/id/R.a3a354e927de17b8e4a936fda96a2898?rik=vLXMrvodUatOpw&riu=http%3a%2f%2fwww.qaadar.com%2fpublic%2fuploads%2fall%2f9EsBZkYAFcHgCuQ4YllBTWjuMTZBtn38AkDz7R67.jpg&ehk=Q21lXlxhY4ywUdBTNry3WsaEQmoka7euqy2xJntt0js%3d&risl=&pid=ImgRaw&r=0","https://dtbtob4osa700.cloudfront.net/MallImages/04052023152223259_mallban.jpg"]}/>
      <Paper elevation={8} sx={{p:{xs:1,sm:2},my:1,bgcolor:"#FF5252"}}>
        <Typography variant='h2'>Hot Product</Typography>
      <CardCoursel datas={["1","2","3","4","5","6","7","8","9","10"]} />
      </Paper>
      <Table/>
    </div>
  )
}
