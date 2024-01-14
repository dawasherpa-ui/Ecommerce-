import { createTheme } from '@mui/material/styles';

// Light Theme
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#0077B6', // Primary color
    },
    secondary: {
      main: '#00A699', // Secondary color 1
      second:'#94C2E5',
    },
    error: {
      main: '#FF6B6B', // Secondary color 2 (error/red)
    },
    background: {
      default:'#B3B3B3' , // Background color (light gray)
      paper: ' #F0F0F0', // Paper background (white)
    },
    text: {
      primary: '#333333', // Text color for light theme (dark gray or black)
    },
  },
  typography: {
    fontFamily: 'Inter,Arial, sans-serif', // Define your preferred font
  },
});


// Dark Theme
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#0077B6', // Dark theme's primary color
    },
    secondary: {
      main: '#00A699', // Dark theme's secondary color 1
      second:'rgba(12,112,187,0.2)'
    },
    error: {
      main: '#FF6B6B', // Dark theme's secondary color 2 (error/red)
    },
    background: {
      default: 'rgba(19, 18, 19, 1)', // Dark theme's background color (dark gray)
      paper: 'rgba(30, 29, 30, 1)', // Dark theme's paper background (darker gray)
    },
    text: {
      primary: '#FFFFFF', // Text color for dark theme
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif', // Define your preferred font
  },
});

export { lightTheme, darkTheme };
