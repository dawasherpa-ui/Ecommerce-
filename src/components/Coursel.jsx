import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import Carousel from 'react-material-ui-carousel';
import Sale from '../assets/offer/offer30.jpg'
function Coursel({component}) {
    return (
        <Box >
        <Carousel 
        indicatorContainerProps={{
            style: {
                display: "none"
            }
        }}
            animation='slide' >
            {
                component.map((element, i) => (
                    <Paper key={i} elevation={3} sx={{
                        height: "32.8vw"
                    }} >
                        <img style={{height:"100%",width:"100%",objectFit:"cover",borderRadius:"5px"}}src={element} alt="offer" />
                    </Paper>
                ))
            }
        </Carousel >
        </Box>
    );
}
export default Coursel
