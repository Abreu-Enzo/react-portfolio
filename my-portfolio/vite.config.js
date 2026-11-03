import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest usa a mesma configuração do Vite. jsdom simula o navegador (DOM) dentro do Node.
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    // Os testes do formulário digitam letra por letra (como uma pessoa) e levam ~2s cada;
    // o limite padrão de 5s estourava às vezes em máquina ocupada ou no CI.
    testTimeout: 15000,
  },
});
