import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@models': '/src/models',
      '@utils': '/src/utils',
    },
  },
})
