import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Sitio multipágina 100% estático: sin backend y sin consumo de API.
export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home: 'index.html',
        resultados: 'resultados.html',
        detalle: 'detalle.html',
        designSystem: 'design-system.html',
      },
    },
  },
});
