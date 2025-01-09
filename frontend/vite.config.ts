import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Pointing to the correct root directory
  build: {
    outDir: 'dist', // The folder where the build output will go
  },
  server: {
    port: 4321, // Change to any other available port
  },
});
