import { Box, Button, Chip, Dialog, IconButton, Input, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/Store';
import { supabase } from '../utils/Supabase';
import Cropper from 'react-easy-crop';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import getCroppedImg from '../utils/cropImage';
function Publish() {
    const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("")
    const [chips, setChips] = useState([]);
    const navigate = useNavigate()
    const { logoutUser, user,setSnackMessage } = useContext(CartContext);
    const [image, setImage] = useState(null);
    const [croppedImg, setCroppedImg] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [openUpload, setOpenUpload] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState('');
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropClick = async () => {
        try {
            const croppedImageBase64 = await getCroppedImg(image, croppedAreaPixels);
            const croppedImageUrl = URL.createObjectURL(croppedImageBase64);
            setCroppedImg(croppedImageUrl);
            setCroppedImage(croppedImageBase64);
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    const handleReset = () => {
        setImage(null);
        setCroppedImage('');
        setCroppedImg(null)
        setZoom(1);
        setCrop({ x: 0, y: 0 });
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleUpload = async (id) => {
        const { data, error } = await supabase.storage
            .from("ruza")
            .upload(`${id}`, croppedImage);
        if (error) {
            console.error("Error uploading image:", error);
        } else {
            console.log("Image uploaded successfully:", data);
            setSnackMessage("published")
            setName('')
            setDescription('')
            setChips([]);
            setPrice("")
            setStock("")
            setCroppedImage(null)
            setCroppedImg(null)
        }
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
    const publishProduct = async () => {
        const fetchData = await fetch("https://ecommerce-backend-9354.onrender.com/api/product", {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(
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
            logoutUser()
            navigate("/login")
        } else { handleUpload(response?.id) }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (chips.length === 0 ) { alert("Please add atleast one tag") }
        else if ((typeof price !== "number" && price > 0) && (typeof stock !== "number" && stock > 0)) { alert("Price and Stock must be numbers") } else if(croppedImg &&croppedImage) {
            publishProduct()
        }else{
            alert("Please Upload Image");
        }

    }
    return (
        <Box sx={{ display: "grid", height: "80vh", placeItems: "center" }}>
            <Paper elevation={3} component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontSize: { md: "24px" } }}>Publish a Product</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", }}>
                    <Box sx={{ display: "flex", justifyContent: "center", height: {xs:"70px",sm:"80px"}, width: "100%" }}>
                        <IconButton onClick={() => setOpenUpload(true)} sx={{ display: "flex", width: {xs:"30vw",sm:"280px",md:"300px"} }}>
                            {!croppedImg &&
                                <Box><AddPhotoAlternateOutlinedIcon sx={{ fontSize: {xs:"30px",md:"3rem"}, color: "text.primary", height: "100%" }} />
                                    <Typography variant="h6" sx={{ color: "text.primary",fontSize:{md:"17px"} }}>Upload Picture</Typography>
                                </Box>}
                            {croppedImg &&
                                <Box sx={{ height: {xs:"60px",sm:"70px"} }}><img src={croppedImg} alt='Product cropped image' style={{ height: "100%", borderRadius: "4px" }} /></Box>}
                        </IconButton>
                    </Box>
                    <Dialog open={openUpload} onClose={() => setOpenUpload(false)}>
                        <Box sx={{ width: "40vw", display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "center", p: 3 }}>
                            {!image && (
                                <Box>
                                    <Box><ImageOutlinedIcon sx={{ fontSize: {xs:"3rem",md:"6rem"} }} /></Box>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={inputRef}
                                        style={{ display: 'none' }}
                                    />
                                    <Button variant="outlined" onClick={() => inputRef.current.click()}>Choose Image</Button>
                                </Box>
                            )}
                            {croppedImg && (
                                <div>
                                    <Typography variant='h4'>Cropped Image</Typography>
                                    <img src={croppedImg} style={{ width: "30vw" }} alt="Cropped" />
                                </div>
                            )}
                            {image && (
                                <Box sx={{px:2,width: {xs:'40vw',md:"300px"},}}>
                                    {!croppedImage && <Box sx={{ position: 'relative', height: {xs:"40vw",md:'300px'},px:2 }}>
                                        <Cropper
                                            image={image}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={4 / 3}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onCropComplete={handleCropComplete}
                                        />
                                    </Box>}
                                    <Box sx={{ display: "flex", gap: 1 ,mt:1}}>
                                        {croppedImage ? <Button variant='contained' onClick={() => setOpenUpload(false)
                                        }>Done</Button> : <Button variant='contained' onClick={handleCropClick}>Crop</Button>}
                                        <Button variant='contained' onClick={handleReset}>Reset</Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Dialog>
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
                    <Button variant='contained'>Cancel</Button>
                    <Button variant='contained' type='submit'>Submit</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default Publish