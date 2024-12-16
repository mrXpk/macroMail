import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/macroMail/',  // Add this line - should match your repository name
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
})
