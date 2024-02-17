import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { useState, useEffect, useMemo } from 'react'
import Lottie from 'lottie-react'
import animatejson from '../assets/svg/Animation - 1705801797085 (1).json'
import SearchIcon from '@mui/icons-material/Search';
function Home() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const messages = useMemo(() =>  [
    'Smartphone Pro',
    'Wireless Headphones',
    'Ultra HD Smart TV',
    'Fitness Tracker',
    'Gaming Laptop'
  ], []);

const [messageIndex, setMessageIndex] = useState(0);
const [text, setText] = useState('');
const delay = 200; // Time delay between each character (in milliseconds)

useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
        if (currentIndex < messages[messageIndex].length) {
            setText(messages[messageIndex].substring(0, currentIndex + 1));
            currentIndex++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                // Start typing the next message after a delay
                setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
                setText('');
            }, 3000); // Delay before typing the next message
        }
    }, delay);

    return () => {
        clearInterval(timer);
    };
}, [messageIndex, messages]);
  return (
    <Box sx={{height:"80vh",display:"grid",placeItems:"center"}}>
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <FormControl sx={{maxWidth:"450px",minWidth:"150px", m: 1,color:"white" }} variant="standard">
          <Input
            type='text'
            sx={{fontSize:{xs:"18px",sm:"28px"},"&:after":{border:"1px solid rgba(0, 50, 255, 0.8)"},"&:before":{borderBottom:"1px solid white"}}}
            placeholder={text}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <SearchIcon sx={{fontSize:{xs:"28px",sm:"32px"},color:"white"}}/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Lottie animationData={animatejson} style={{width:"80%"}}/>
      </Box>
    </Box>
  )
}

export default Home
