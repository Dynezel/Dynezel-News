import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // importante para que los assets se sirvan desde la raíz
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // opcional, alias para imports
    },
  },
  build: {
    outDir: 'dist', // Vercel espera 'dist' por defecto
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: false, // ayuda con importaciones fuera de src
    },
  },
});