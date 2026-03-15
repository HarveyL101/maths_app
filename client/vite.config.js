import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api/credentials': 'http://localhost:5000',
      '/api/login': 'http://localhost:5000',
      '/api/register': 'http://localhost:5000/',      
      '/logout': 'http://localhost:5000/',
      '/api': 'http://localhost:5000/',
      '/api/api/question-portal': 'http://localhost:5000/'
    }
  }
})
