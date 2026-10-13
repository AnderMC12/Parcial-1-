import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Sitio multipágina. Los datos se obtienen en el navegador desde REST Countries,
// por lo que no hay backend propio ni paso de compilación que dependa de la red.
export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: 'index.html',
        detalle: 'detalle.html',
        designSystem: 'design-system.html',
      },
    },
  },
});
