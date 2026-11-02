import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// Adiciona verificações de DOM ao expect: toBeInTheDocument, toBeDisabled, toHaveFocus...
import "@testing-library/jest-dom/vitest";

// Desmonta o que cada teste renderizou, para um teste não enxergar a tela do anterior.
afterEach(() => {
  cleanup();
});
