import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as dotenv from 'dotenv';
import config from "@2025-personal-portfolio/frontend-common/src/config";

dotenv.config({ path: '.env.local' });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: parseInt(process.env.PORT ?? '8000', 10),
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0
  },
  esbuild: {
    target: 'esnext',
    supported: {
      arrow: true,
      'async-await': true,
      bigint: true,
      'nullish-coalescing': true,
    },
  },
})