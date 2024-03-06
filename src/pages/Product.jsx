import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  IconButton,
  Input,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import GrainIcon from "@mui/icons-material/Grain";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Snackbar from "@mui/material/Snackbar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CartContext } from "../context/Store";
import { supabase } from "../utils/Supabase";
import Banner from "../components/Banner";
function Product() {
  const id = useParams();
  const { user, addProduct, logoutUser, setSnackMessage, productId } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [updateState, setUpdateState] = useState(0);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [show, setShow] = useState(null)
  const [datas, setDatas] = useState(null)
  const [ownerData, setOwnerData] = useState(null)
  const [isInWishList, setIsInWishlist] = useState(null)
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("")
  const [chips, setChips] = useState([]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // This prevents the default form submission behavior
      if (inputValue.trim()) {
        setChips([...chips, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const handleChipDelete = (index) => () => {
    setChips((chips) => chips.filter((chip, chipIndex) => chipIndex !== index));
  };
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  function handleMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setPosition({ x, y });
  }

  function handleMouseEnter() {
    setZoom(1.5); // Increase zoom level on mouse enter
  }

  function handleMouseLeave() {
    setZoom(1); // Reset zoom level on mouse leave
  }
  const handleClick = () => {
    setOpen(true);
  };
  const findOwner = async (id) => {
    try {
      const userData = await fetch(`https://ecommerce-backend-9354.onrender.com/api/user/${id}`, { method: "GET" });
      const data = await userData.json()
      data?.search !== 0 ? setOwnerData(data) : setOwnerData(false)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (datas) {
      findOwner(datas.owner)
    }
  }, [datas])
  const handleImageDelete = async () => {
    const { data, error } = await supabase
      .storage
      .from('ruza')
      .remove([`${id.id}`])
    if (error) { console.log(error) }
    console.log(data)
  }
  const handleDelete = async () => {
    const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/${id.id}`,
      {
        method: "DELETE",
        credentials: "include"
      });
    const data = await response.json();
    data.auth == false ? (logoutUser(), setSnackMessage("expired"), navigate("/login")) :
      (navigate("/shop"), handleImageDelete())
  }
  const handleFetch = async () => {
    try {
      const response = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/${id.id}`, { method: "GET" });
      const data = await response.json()
      if (data?.search !== 0) {
        setShow(true)
        setDatas(data)
      } else { setShow(false) }
    } catch (err) {
      console.log(err)
    }
  }
  function hasId(jsonArray, targetId) {
    return jsonArray.some(obj => obj._id === targetId);
  }
  useEffect(() => {
    handleFetch()
    if (hasId(productId, id.id)) {
      setIsInWishlist(true)
    } else { setIsInWishlist(false) }
  }, [id, updateState])
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleOpenEdit = () => {
    setOpenEditForm(true)
    datas ? (setChips(datas.tag), setName(datas.name), setPrice(datas.price), setStock(datas.stock), setDescription(datas.description)) : null
  }
  const updateProduct = async () => {
    const fetchData = await fetch(`https://ecommerce-backend-9354.onrender.com/api/product/${id.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(
        {
          name: name,
          owner: user.id,
          description: description,
          price: Number(price),
          stock: Number(stock),
          tag: chips
        }),
      credentials: "include"
    })
    const response = await fetchData.json()
    if (response?.auth == false) {
      logoutUser(); setSnackMessage("expired"); navigate("/login")
    } else {
      setOpenEditForm(false)
      setUpdateState((e) => e + 1)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (chips.length === 0) { alert("Please add atleast one tag") }
    else if ((typeof price !== "number" && price > 0) || (typeof stock !== "number" && stock > 0)) { alert("Price and Stock must be numbers") } else {
      updateProduct()
    }

  }

  const uRL =
    "https://ldgnpdudaohjifgktmst.supabase.co/storage/v1/object/public/ruza/";
  return (
    <Box>
      {show == true ? <>
        <Box role="presentation" sx={{ my: 1 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{ display: "flex", textDecoration: "none", alignItems: "center" }}
              to="/"
            >
              <HomeIcon sx={{ mr: 0.5, color: "text.primary" }} fontSize="inherit" />
              <Typography variant="subtitle" sx={{ "&:hover": { textDecoration: "underline" }, color: "text.primary", fontSize: { sm: "14px", md: "18px" } }}>Home</Typography>
            </Link>
            <Link
              style={{ display: "flex", textDecoration: "none", alignItems: "center" }}
              to="/shop"
            >
              <StoreIcon sx={{ mr: 0.5, color: "text.primary" }} fontSize="inherit" />
              <Typography variant="subtitle" sx={{ "&:hover": { textDecoration: "underline" }, color: "text.primary", fontSize: { sm: "14px", md: "18px" } }}>Shop</Typography>
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography variant="subtitle" sx={{ fontSize: { sm: "14px", md: "18px" } }}>{id.id}</Typography>
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: "grid",
            my: 3,
            gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" },
            gap: { xs: "10px" },
            px: 2,
          }}
        >
        <Box sx={{display:"grid",placeItems:"center" ,py:2,}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width:{xs:"100%",sm:"90%",md:"70%"},
              aspectRatio: "16/9",
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              style={{
                border: "1px solid #31115", borderRadius: "5px", objectFit: "cover", display: 'block',
                width: '100%',
                cursor: "zoom-in",
                height: 'auto',
                transform: `scale(${zoom})`, // Apply scale transformation
                transformOrigin: `${position.x * 100}% ${position.y * 100}%`, // Zoom origin
                transition: 'transform 0.1s ease-out',
              }}
              src={`${uRL + id.id}`}
              alt="Productimg"
            />
          </Box>
          </Box>
          <Box>
            <Box sx={{ height: "auto", p: { xs: 1, sm: 2, md: 3 } }}>
              {datas.owner == user?.id && <Box sx={{ float: "right" }}>
                <IconButton onClick={(e) => handleClickMenu(e)}>
                  <MoreVertIcon sx={{ color: "text.primary" }} />
                </IconButton>
                <Menu anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}>
                  <MenuItem onClick={handleOpenEdit} >Edit</MenuItem>
                  <MenuItem onClick={() => { setOpenDeleteForm(true) }}>Delete</MenuItem>
                </Menu>
                <Dialog open={openDeleteForm} onClose={() => setOpenDeleteForm(false)}>
                  <Box sx={{ px: 3, py: 3, width: "30vw" }}>
                    <Typography variant="h4" sx={{ fontSize: { md: "20px" }, textAlign: "center" }}>Are You Sure ?</Typography>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 3 }}>
                      <Button sx={{ color: "#B00020" }} onClick={handleDelete}>Delete</Button>
                      <Button onClick={() => setOpenDeleteForm(false)}>Cancel</Button>
                    </Box>
                  </Box>
                </Dialog>
                <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
                  <Paper elevation={3} component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
                    <Typography variant="h4" sx={{ textAlign: "center", fontSize: { md: "24px" } }}>Edit Product</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", }}>
                      <Box>
                        <Typography htmlFor="name" component="label" variant='h5' sx={{ fontSize: { md: "18px" } }}>Name : </Typography>
                        <Input id="name" sx={{ fontSize: { xs: "3vw", sm: "17px" }, "&:before": { borderBottom: "1px solid white" } }} type="text" placeholder='Samsung S24' value={name} onChange={(e) => { setName(e.target.value) }} required />
                      </Box>
                      <Box>
                        <Typography htmlFor="stock" component="label" variant='h5' sx={{ fontSize: { md: "18px" } }}>Stock : </Typography>
                        <Input id="stock" sx={{ width: { xs: "40%", sm: "150px" }, fontSize: { xs: "3vw", sm: "17px" }, "&:before": { borderBottom: "1px solid white" } }} type="text" placeholder='5' inputMode="numeric"
                          pattern="[0-9]+" value={stock} onChange={(e) => { setStock(Number(e.target.value)) }} required />
                      </Box>
                      <Box>
                        <Typography htmlFor="price" component="label" variant='h5' sx={{ fontSize: { md: "18px" } }}>Price : </Typography>
                        <Input
                          id="price"
                          sx={{ width: { xs: "40%", sm: "150px" }, fontSize: { xs: "3vw", sm: "17px" }, "&:before": { borderBottom: "1px solid white" } }}
                          startAdornment={<InputAdornment position="start"><Typography variant='subtitle' sx={{ fontSize: { xs: "3vw", sm: "17px" }, color: "text.primary" }}>$</Typography></InputAdornment>}
                          type='number'
                          placeholder='2000'
                          inputProps={{ min: 1, max: 9999 }}
                          value={price} onChange={(e) => { setPrice(Number(e.target.value)) }}
                          required
                        />
                      </Box>
                      <Box>
                        <Typography htmlFor="tag" component="label" variant='h5' sx={{ fontSize: { md: "18px" } }}>Tags : </Typography>
                        <TextField
                          variant="standard"
                          value={inputValue}
                          onChange={handleInputChange}
                          sx={{
                            '& input': {
                              fontSize: {
                                xs: '3vw', // Font size for extra small screens
                                sm: '17px' // Font size for small screens
                              }
                            }, width: { xs: "60%", sm: "220px" }, ".css-fqwk7z-MuiInputBase-root-MuiInput-root::before": { borderBottom: "1px solid white" }
                          }}
                          placeholder='Type and press enter'
                          onKeyPress={handleInputKeyPress}
                        />
                        <Stack direction="row" spacing={1} sx={{ width: { xs: "180px", sm: "220px" }, overflowX: "auto" }}>
                          {chips.map((chip, index) => (
                            <Chip
                              key={index}
                              label={chip}
                              sx={{ fontSize: { xs: "2.3vw", sm: "17px" } }}
                              onDelete={handleChipDelete(index)}
                            />
                          ))}
                        </Stack>
                      </Box>
                      <Box sx={{ marginTop: { xs: "5px", sm: "10px" } }}>
                        <Typography htmlFor="description" component="label" variant='h5' sx={{ fontSize: { md: "18px" } }}>Description : </Typography>
                        <Input id="description" sx={{ bgcolor: "rgba(255, 255, 255, 0.16)", borderRadius: "5px", fontSize: { xs: "3vw", sm: "17px" }, p: 1, "&:before": { borderBottom: "1px solid white" } }} type="text" placeholder='This is a ...' multiline
                          rows={4}
                          value={description} onChange={(e) => { setDescription(e.target.value) }}
                          required />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end", gap: "5px", mt: "5px" }}>
                      <Button variant='contained' onClick={() => setOpenEditForm(false)}>Cancel</Button>
                      <Button variant='contained' type='submit'>Submit</Button>
                    </Box>
                  </Paper>
                </Dialog>
              </Box>}
              <Typography variant="h4" sx={{ textTransform: "capitalize", fontSize: { md: "24px" } }}>{datas.name}</Typography>
              <Box>
                <Box sx={{ paddingLeft: 1, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <Typography variant="h5" sx={{ fontSize: { sm: "1.7vw", md: "1.5vw" }, fontWeight: "400" }}>Price : ${datas.price}</Typography>
                  <Typography variant="h5" sx={{ fontSize: { sm: "1.7vw", md: "1.5vw" }, fontWeight: "400" }}>In Stock : {datas.stock}</Typography>
                  <Typography variant="h5" sx={{ fontSize: { sm: "1.7vw", md: "1.5vw" }, fontWeight: "400" }}>Sold Out: {datas.stock * 2}</Typography>
                  <Typography variant="h5" sx={{ fontSize: { sm: "1.7vw", md: "1.5vw" }, fontWeight: "400" }}>Delivery : ${(datas.price * 6 / 100).toFixed(2)}</Typography>
                </Box>
                <Box sx={{ paddingLeft: 1, mt: 2, fontSize: "2vw" }}>
                  <Input type="number" inputProps={{ min: 1, max: 20 }} sx={{ ".css-1x51dt5-MuiInputBase-input-MuiInput-input": { p: "2px" }, borderRadius: "2px", fontSize: { xs: "2.7vw", sm: "14px", md: "16px" }, bgcolor: "white", width: "50px", outline: "none", color: "#697179" }} defaultValue={1} />
                </Box>
                <Box sx={{ display: "flex", gap: "10px", margin: 1 }}>
                  <Link to={`/buy/${id.id}`} style={{ textDecoration: "none" }}><Button variant="contained">Buy</Button></Link>
                  {!isInWishList ? <Button
                    variant="contained"
                    onClick={() => {
                      addProduct(datas);
                      handleClick();
                    }}
                  >
                    Cart
                  </Button> :
                    <Button variant="contained" onClick={()=>navigate('/cart')} >
                      Added to Cart
                    </Button>}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <Typography variant="h5" sx={{ fontSize: { sm: "12px", md: "16px" } }}>Tags</Typography>
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    {datas.tag.map((e, i) =>
                      <Chip key={i} label={e} variant="outlined" sx={{ bgcolor: "background.paper", border: "1px solid #31115", fontSize: { xs: "2vw", sm: "1.2vw", md: "14px" }, height: "auto", paddingBlock: { xs: "1vw", sm: "5px" }, textTransform: "capitalize" }} />
                    )}</Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: { xs: "1/2", sm: "1/2" },
              px: 2,
              display: "flex", flexDirection: "column", gap: "10px",
            }}
          >
            <Box sx={{ width: "fit-content",paddingRight:"10px", }}>
              <Link to={`/user/${datas.owner}`} style={{ textDecoration: "none", width: "auto" }}>
                {datas&&<Box sx={{ display: "flex", alignItems: "center", gap: { xs: "2px", md: "5px" }, }}>
                  <Avatar sx={{ width: { xs: "30px", sm: "40px", md: "50px" }, height: { xs: "30px", sm: "40px", md: "50px" } }} src="https://source.unsplash.com/random/?avatar/" />
                  <Typography variant="h4" sx={{ fontSize: { sm: "14px", md: "18px" }, textTransform: "capitalize", color: "text.primary" }}>{`${ownerData?.firstName} ${ownerData?.lastName}`}</Typography>
                </Box>}
              </Link>
            </Box>

            <Box sx={{width:"70%"}}>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h4" sx={{ fontSize: { md: "20px" } }}>Description</Typography><ArticleOutlinedIcon sx={{ fontSize: { xs: "4vw", sm: "3vw", md: "26px" } }} />
              </Box>
              <Typography variant="h5" sx={{ fontSize: { sm: "1.7vw", md: "16px" }, marginLeft: "15px", fontWeight: "400" }}>{datas.description}</Typography>
            </Box>
          </Box>
          <Box sx={{px:1}}>
            <Banner productName={datas.name} productId={id.id}/>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Added To Cart
          </Alert>
        </Snackbar>
      </> : show == null ? <Box>Loading...</Box> : <Box>No user...</Box>}
    </Box>
  );
}

export default Product;
