import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Box>
      <Typography variant='h2'>
      🚫404 Page not found. Get back <Link to="/">Home</Link>
      </Typography>
    </Box>
  )
}

export default NotFoundPage
