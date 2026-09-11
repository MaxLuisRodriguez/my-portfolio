import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'github' ? '/my-portfolio/' : '/',
  build: {
    rolldownOptions: {
      input: { portfolio: 'index.html', evensong: 'evensong/index.html', somunicate: 'somunicate/index.html' },
    },
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
}))
