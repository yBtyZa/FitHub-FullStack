import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Defina a porta do servidor
    host: '0.0.0.0', // Permite que o servidor escute em todas as interfaces
  },
})