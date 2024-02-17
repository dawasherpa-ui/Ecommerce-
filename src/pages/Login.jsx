import { Box, Button, FormControl, Typography } from "@mui/material";
import Lottie from "lottie-react";
import React from "react";
import LoginAni from "../assets/svg/login.json";
import { Link } from "react-router-dom";
function Login() {
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
      <Box sx={{ height: {xs:"100%",sm:"450px"} }}>
        <Lottie animationData={LoginAni} style={{ height: "100%" }} />
      </Box>
      <Box>
        {/* <Box sx={{border:`${"1px solid white"}`,width:"400px"}}> */}
        <FormControl
          component="form"
          //   onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: { sm: "240px", md: "300px" },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontSize: { xs: "16px", sm: "2.3vw" },
              marginBottom: "10px",
            }}
          >
            Login
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "space-evenly", sm: "space-between" },
              alignItems: "center",
              width: { sm: "240px", md: "300px" },
            }}
          >
            <Typography
              component="label"
              htmlFor="email"
              variant="subtitle"
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
                //   onChange={(e)=>setEmail(e.target.value)}
                //   value={email}
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
              justifyContent: { xs: "space-evenly", sm: "space-between" },
              alignItems: "center",
              width: { sm: "240px", md: "300px" },
            }}
          >
            <Typography
              component="label"
              htmlFor="password"
              variant="subtitle"
              // sx={{ flexGrow:1, textAlign: "center",fontSize:{xs:"14px",sm:"16px"}  }}
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
            <Typography sx={{textAlign:"center" ,fontSize:{xs:"12px",sm:"14px",md:"16px"}}}>Don't have account ?<Link to="/signin" style={{color:"white"}}>Create</Link></Typography>
          </Box>
        </FormControl>
        {/* </Box> */}
      </Box>
    </Box>
  );
}

export default Login;
