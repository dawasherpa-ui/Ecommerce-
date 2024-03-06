import { Box, Button, FormControl, Typography } from "@mui/material";
import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import LoginAni from "../assets/svg/login.json";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/Store";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSnackMessage, authUser } = useContext(CartContext);
  const navigate = useNavigate()
  const loginUser = async () => {
    const response = await fetch('https://ecommerce-backend-9354.onrender.com/api/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include' // Include cookies in the request
    });
    const data = await response.json();
    data?.auth == false ? setSnackMessage("invalid") : (authUser(data),setSnackMessage("logedIn"),
    navigate("/"))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser()
  }
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr", md: "1fr 1fr" },
        gridTemplateRows: { xs: "150px 1fr", sm: "1fr" },
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: { xs: "100%", sm: "450px" } }}>
        <Lottie animationData={LoginAni} style={{ height: "100%" }} />
      </Box>
      <Box>
        {/* <Box sx={{border:`${"1px solid white"}`,width:"400px"}}> */}
        <FormControl
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: { sm: "240px", md: "300px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontSize: {xs:"16px",sm:"20px", md: "22px" },
              marginBottom: "10px",
            }}
          >
            Login
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { sm: "240px", md: "300px" },
            }}
          >
            <Typography
              component="label"
              htmlFor="email"
              variant="h4"
              sx={{ fontSize: { xs: "13px", sm: "16px", md: "18px" }, textAlign: "end",width:{xs:"30%"},pr:1 }}
            >
              Email{" "}
            </Typography>
            <Box sx={{ minWidth: "100px", maxWidth: "300px" }}>
              <input
                style={{
                  paddingBlock: "5px",
                  paddingInline: "10px",
                  fontSize: "15px",
                  borderRadius: "4px",
                  border: "1px solid #cfd1d6",
                  width: "100%",
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                type="email"
                placeholder="user@gmail.com"
                required
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { sm: "240px", md: "300px" },
            }}
          >
            <Typography
              component="label"
              htmlFor="password"
              variant="h4"
              sx={{ fontSize: { xs: "13px", sm: "16px", md: "18px" }, textAlign: "end",width:{xs:"30%"},pr:1  }}
            >
              Password{" "}
            </Typography>
            <Box sx={{ minWidth: "100px", maxWidth: "300px" }}>
              <input
                style={{
                  paddingBlock: "5px",
                  paddingInline: "10px",
                  fontSize: "15px",
                  borderRadius: "4px",
                  border: "1px solid #cfd1d6",
                  width: "100%",
                }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </Box>
          </Box>
          <Box sx={{ alignSelf: "center", marginTop: "10px" }}>
            <Button type="submit" variant="contained">
              Log In
            </Button>
          </Box>
          <Box>
            <Typography sx={{ textAlign: "center", fontSize: { xs: "12px", sm: "14px", md: "16px" } }}>Don't have account ?<Link to="/signin" style={{ color: "white" }}>Create</Link></Typography>
          </Box>
        </FormControl>
        {/* </Box> */}
      </Box>
    </Box>
  );
}

export default Login;
