import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginString from 'vite-plugin-string';

export default defineConfig({
  plugins: [
    react(),
    VitePluginString({
      include: ['**/*.html'], 
      exclude: ['**/index.html'],
    }),
  ],
});
