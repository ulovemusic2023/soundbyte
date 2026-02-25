import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // 'selfhost' mode → base '/' (tunnel/local); default → '/soundbyte/' (GitHub Pages)
  base: mode === 'selfhost' ? '/' : '/soundbyte/',
}))
