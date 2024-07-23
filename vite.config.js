import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexões externas
    port: 5173, // A porta que você usa
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Endereço da sua API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})


