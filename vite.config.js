import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { plugin as markdown } from 'vite-plugin-markdown'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    markdown({ mode: ['markdown'] })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  base: '/', 
})
