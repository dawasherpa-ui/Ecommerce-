import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Replace with the actual address
        changeOrigin: true, // Allow changing origin for CORS
        secure: false, // Disable SSL verification (for development only)
        rewrite: path => path.replace(/^\/api/, '') // Optional: rewrite path
      }
    }
  }
})
