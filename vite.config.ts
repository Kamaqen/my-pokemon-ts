import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Base URL de tu aplicación, asegúrate de que es correcta para el despliegue en Netlify
  build: {
    outDir: "dist", // Directorio de salida para los archivos de build
  },
  server: {
    port: 5173, // Puerto del servidor de desarrollo
  },
});
