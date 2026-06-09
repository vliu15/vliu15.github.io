import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { plugin as markdown, Mode } from 'vite-plugin-markdown'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    markdown({ mode: [Mode.HTML] }),
  ],
})
