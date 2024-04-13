import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@common-components': '/src/components/common',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
    },
  },
})
