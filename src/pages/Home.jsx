import { Box, IconButton, Input, InputAdornment, List, ListItem } from '@mui/material'
import React, { useState, useEffect, useMemo } from 'react'
import Lottie from 'lottie-react'
import animatejson from '../assets/svg/Animation - 1705801797085 (1).json'
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const messages = useMemo(() => [
    'Smartphone Pro',
    'Wireless Headphones',
    'Ultra HD Smart TV',
    'Fitness Tracker',
    'Gaming Laptop'
  ], []);

  const [messageIndex, setMessageIndex] = useState(0);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(null);
  const [datas, setDatas] = useState([]);
  const [controller, setController] = useState(null);
  const navigate=useNavigate()

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

  const handleSearch = async () => {
    if (controller) {
      controller.abort(); // Abort previous request if exists
    }

    const newController = new AbortController();
    setController(newController);

    try {
      const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/search?name=${search}&page=1&limit=30`, {
        method: "GET",
        signal: newController.signal
      });

      const data = await response.json();
      if (data?.search !== 0) {
        setDatas(data.user);
        console.log(data.user);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Previous request aborted');
      } else {
        console.log('Error fetching data:', err);
      }
    }
  }

  useEffect(() => {
    if (search.length > 1) {
      handleSearch();
    }
  }, [search]);

  const searchClick=()=>{    
    navigate(`/search/${search}`)  
  }
  return (
    <Box sx={{ height: "80vh", display: "grid", placeItems: "center", overflow: "hidden" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden" }}>
        <Box sx={{ position: "relative", maxWidth: "450px", minWidth: "150px", m: 1, color: "white" }}>
          <Input
            type='text'
            sx={{ fontSize: { xs: "18px", sm: "28px" }, "&:before": { borderBottom: "1px solid white" } }}
            placeholder={text}
            onChange={(e) => { setSearch(e.target.value.toLowerCase()) }}
            onClick={() => { setShow(true) }}
            onBlur={() => { setShow(false) }}
            value={search}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => { searchClick() }}
                >
                  <SearchIcon sx={{ fontSize: { xs: "28px", sm: "32px" }, color: "white" }} />
                </IconButton>
              </InputAdornment>
            }
          />
          {show ?
            <Box sx={{ position: "absolute", zIndex: "99", top: "100%", backdropFilter: "blur(5px)", bgcolor: "rgba(0, 0, 0, 0.54)", px: 1, pb: 2, pt: 0, width: "100%" }}>
              <List sx={{ p: 0 }}>
                {search.length === 0 ? "Search to purchase" : datas.length > 0 ? datas.map((e, i) => 
                <Link to={`/shop/${e._id}`} key={i} style={{textDecoration:"none",}}>
                <ListItem sx={{ p: 0, pt: 1, textTransform: "capitalize",color:"text.primary" }}onMouseDown={(e) => e.preventDefault()}>
                  {e.name}
                </ListItem>
                </Link>
                ) : "Search not found"}
              </List>
            </Box> : null}
        </Box>
        <Box sx={{ width: "80%", overflow: "hidden" }}>
          <Lottie animationData={animatejson} style={{ width: "100%" }} />
        </Box>
      </Box>
    </Box>

  )
}

export default Home;
