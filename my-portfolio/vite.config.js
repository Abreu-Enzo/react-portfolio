import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest usa a mesma configuração do Vite. jsdom simula o navegador (DOM) dentro do Node.
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
