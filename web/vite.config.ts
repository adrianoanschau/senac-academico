import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
