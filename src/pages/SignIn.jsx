import { Box, Button, FormControl, Typography } from '@mui/material'
import React, { useState } from 'react'
function SignIn() {
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const createUser = async () => {
    const response = await fetch('http://localhost:3000/api/user/', {
      method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        fname: `${fName}`,
        lname: `${lName}`,
        email: `${email}`,
        password: `${password}`
      })
    })
    const data = await response.json()
    console.log(data)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser()
    console.log("Submitted")
  }
  return (
    <Box sx={{ display: "grid", height: "80vh", placeItems: "center" }}>
      <Box sx={{ display: "grid", width: { xs: "70vw", sm: "550px", md: "60vw" }, backgroundColor: "#1c1a1a", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gridTemplateRows: { xs: "100px 1fr", sm: "1fr" }, gap: { xs: "10px", sm: "30px" }, px: 3, py: 8 }}>
        <Box>
          <Typography variant='h3' sx={{ marginBottom: "6px", fontSize: { md: "24px" }, textAlign: "center" }}>Welcome</Typography>
          <Typography variant='subtitle' sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" }, textAlign: "center" }}>Create an account to save your favorites, manage orders, and enjoy a smoother shopping experience.</Typography>
        </Box>
        <Box>
          <FormControl component="form" sx={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px" }} onSubmit={handleSubmit}>
            <Box sx={{ gridColumn: "1/3" }}><Typography variant='h3' sx={{ textAlign: "center", fontSize: { md: "24px" } }}>SignIn</Typography></Box>
            <Box className="labels" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "10px" }}>
              <Typography
                component="label"
                htmlFor="fname"
                variant="subtitle"
              >
                FirstName{" "}
              </Typography>
              <Typography
                component="label"
                htmlFor="lname"
                variant="subtitle"
              >
                LastName{" "}
              </Typography>
              <Typography
                component="label"
                htmlFor="email"
                variant="subtitle"
              >
                Email{" "}
              </Typography>
              <Typography
                component="label"
                htmlFor="password"
                variant="subtitle"
              >
                Password{" "}
              </Typography>
            </Box>
            <Box className="inputs" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "10px" }}>
              <input
                style={{
                  paddingBlock: "5px",
                  paddingInline: "10px",
                  fontSize: "15px",
                  borderRadius: "4px",
                  border: "1px solid #cfd1d6",
                  width: "100%",
                }}
                onChange={(e) => setFName(e.target.value)}
                value={fName}
                id="fname"
                type="text"
                placeholder="John"
                required
              />
              <input
                style={{
                  paddingBlock: "5px",
                  paddingInline: "10px",
                  fontSize: "15px",
                  borderRadius: "4px",
                  border: "1px solid #cfd1d6",
                  width: "100%",
                }}
                onChange={(e) => setLName(e.target.value)}
                value={lName}
                id="lname"
                type="text"
                placeholder="Grunt"
                required
              />
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
                type="text"
                placeholder="Password"
                required
              />
            </Box>
            <Box sx={{ gridColumn: "1/3",display:"grid",placeItems:"end" }}><Button variant="contained" type="submit">SignIn</Button></Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}

export default SignIn
