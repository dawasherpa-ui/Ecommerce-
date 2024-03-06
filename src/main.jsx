import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../Theme.jsx'
import { BrowserRouter } from 'react-router-dom'
import Store from './context/Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Store>
    <BrowserRouter>
    <ThemeProvider theme={lightTheme}>
    <CssBaseline/>
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </Store>
  </>,
)
