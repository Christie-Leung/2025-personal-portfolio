import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  build: {
    assetsInlineLimit: 0,
  }
})
