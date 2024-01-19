import { createTheme } from '@mui/material/styles';

// Light Theme
const customBreakpoints = {
  values: {
    xs: 0,
    sm: 601,
    md: 900, // Modify the medium breakpoint
    lg: 1200, // Modify the large breakpoint
    xl: 1600, // Modify the extra-large breakpoint
  },
};
const lightTheme = createTheme({
  breakpoints: customBreakpoints,
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
  },components: {
    MuiButton: {
      styleOverrides: {
        // Add your default button styles here
        root: {
          '&:focus': {
            outline: 'none',
          },color:"white",
          minWidth:"auto",
          // fontWeight:"350",
          fontSize:"16px",
          paddingInline:"1vw", 
          '@media (max-width:1200px)': {
            fontSize:"14px",
            paddingInline:"1vw", 
            paddingBlock:"2px"
          },
          '@media (max-width:900px)': {
            fontSize:"12px",
            // fontSize:"2vw",
            paddingInline:"1vw",
            paddingBlock:"2px" // Apply this color for h6 on screens wider than 600px
          },
          '@media (max-width:600px)': {
            fontSize:"2.5vw",
            // fontSize:"2vw",
            paddingInline:"2vw",
            paddingBlock:"2px" // Apply this color for h6 on screens wider than 600px
          },
          // Add more styles as needed
        },
      },
    },
  },
  typography: {
    fontFamily: 'Inter,Arial, sans-serif',
    h1:{
      color:"#333333",
      fontSize:"3.8vw",
      '@media (max-width:600px)': {
        fontSize:"6vw", // Apply this color for h6 on screens wider than 600px
      },
    } // Define your preferred font
    ,h2:{
      color:"#333333",
      fontSize:"3.3vw",
      fontWeight:"450",
      '@media (max-width:600px)': {
        fontSize:"5.5vw", // Apply this color for h6 on screens wider than 600px
      },
    } // Define your preferred font
    ,h3:{
      color:"#333333",
      fontSize:"2.8vw",
      '@media (max-width:600px)': {
        fontSize:"4vw", // Apply this color for h6 on screens wider than 600px
      },
    } // Define your preferred font
    ,h4:{
      color:"#333333",
      fontSize:"2.5vw",
      '@media (max-width:600px)': {
        fontSize:"3.5vw", // Apply this color for h6 on screens wider than 600px
      },
    } // Define your preferred font
    ,h5:{
      color:"#333333",
      fontSize:"2.3vw",
      '@media (max-width:600px)': {
        fontSize:"3vw", // Apply this color for h6 on screens wider than 600px
      },
    } // Define your preferred font
    ,h6:{
      color:"#333333",
      fontSize:"1.8vw",
      '@media (max-width:600px)': {
        fontSize:"2.5vw", // Apply this color for h6 on screens wider than 600px
      },
    },
    subtitle:{
      fontSize:"1.5vw",
      fontWeight:"350",
      '@media (max-width:600px)': {
        fontSize:"2.8vw",
        fontWeight:"100", // Apply this color for h6 on screens wider than 600px
      },
    }
  },
});
export { lightTheme };
